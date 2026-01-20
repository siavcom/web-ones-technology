/////////////////////////////////////////////
// Description : Servidor Web sockets para enviar docuemntos por WhatsApp y correo
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2025-02-12
// Update Date  :  2025-02-12
// Observaciones : Trabajando bien  2025-02-12. Se tuvo que borrar cache whatsApp
/////////////////////////////////////////////

import os from 'os';
//const path = require('path');
import fs from 'fs';
import { unlinkSync } from 'fs';
import { join } from 'path';

//const { unlinkSync } = fs;
//import { nodemailer } from "nodemailer";


//import mail from 'nodemailer/lib/nodemailer.js';
//const { nodemailer } = mail

import nodemailer from 'nodemailer';

// Se tuvo que importar whatsapp-web.js de esta manera para que funcione
//import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
//import pkg from 'file:///Desarrollo/web-ones/web-ones-NUXT-4.2/node_modules/whatsapp-web.js/index.js';
import pkg from 'whatsapp-web.js/index.js';
const { Client, LocalAuth, MessageMedia } = pkg;

//import { Client, LocalAuth, Message, MessageMedia } from 'whatsapp-web.js';

const whatsApp = new Client({

    //authStrategy: new LocalAuth(), // mantener session abierta
    authStrategy: new LocalAuth({
        dataPath: '/tmp/WhatsApp'
    }),

    puppeteer: {
        headless: false,  // true para modo sin interfaz, false para ver el navegador el qr 
        ignoreHTTPSErrors: true,
        args: [
            "--no-sandbox",
            //"--disable-setuid-sandbox", // Recommended for secure environments like Docker/Heroku
            "--disable-extensions",   // To minimize memory usage
            '--unhandled-rejections=strict', // This helps surface the exact source of the error
            '--window-size=1280,800'    // To set a specific window size
        ],
    },


    /*    authStrategy: new LocalAuth({  // Guarda las sesiones de WhatsApp
            dataPath: './.session'  // Folder que contiene los datos sesion
        }),
    */
});

//whatsApp.initialize();

//import { Connection } from 'tedious';


let QrCode = ''
let whatsAppReady = false
//let sw_connection = false
let webSocketPeer: any = null
const room = 'ROOM'

/********* Servidor de whatsapp ************/

whatsApp.on('qr', (qr: string) => {

    if (whatsAppReady)
        return
    WhatsAppInit = true;
    QrCode = qr
    const data = {
        result: 'QrCode',
        data: QrCode,
        mensaje: 'Qr Generado OK'
    }

    console.log('===========>Genera QrCode  QrCode=', data)
    webSocketPeer.send(data)
});

whatsApp.on('ready', () => {
    //  const res = { whatsAppReady }
    console.log('Whatsapp Client is ready!');
    whatsAppReady = true
    // webSocketPeer.send(JSON.stringify({ result: 'Ready', data: whatsAppReady }));
    webSocketPeer.send({ result: 'WhatsAppReady', data: whatsAppReady });

});

whatsApp.on('message_create', (message: any) => {
    whatsAppReady = true
    // webSocketPeer.send(JSON.stringify({ result: 'Ready', data: whatsAppReady }));
    webSocketPeer.send({ result: 'WhatsAppReady', data: whatsAppReady });
    console.log('Mensaje recibido=', message); // todo el objeto del mensaje
    // message.text

    // si boody es igual a !ping
    /*
    
    if (message.body === 'ping') {
        // send back "pong" to the chat the message was sent in
        whatsApp.sendMessage(message.from, '1) pong');
        message.reply('2) pong');
    }
     else
        Socket.emit('message', message)
    */

});


let WhatsAppInit = false

/////////////////  Servidor de WebSockets //////////////////

export default defineWebSocketHandler({
    open(wsPeer) {  // peer=par
        console.log('SendDocto opened WS<========Numero de socket=', wsPeer.id);
        webSocketPeer = wsPeer;

        //wsPeer.subscribe(room)

        // wsPeer.publish - enviar mensaje a todos en la sala
        // wsPeer.publish(room, 'Another user joined the chat')  // Mensaje para todos

    },
    close(wsPeer) {
        console.log('SendDocto close WS=====>', wsPeer.id)
    },
    error(wsPeer, error) {
        console.log('SendDocto error on WS=====>', wsPeer.id, ' error=', error)

    },
    message(wsPeer, message) {
        // console.log('SendDocto message on WebSocket=', message.transport, message.job)
        processMessage(wsPeer, message)
    },
})

/////////////////////// Funciones /////////////////////////
function genChatId(phoneNumber: string) {
    let chatId = phoneNumber.replaceAll('+', '')
    chatId = chatId.replaceAll(' ', '')
    chatId = chatId.replaceAll('-', '')
    chatId = chatId.replaceAll('(', '')
    chatId = chatId.replaceAll(')', '')
    chatId = chatId.replaceAll('.', '') + "@c.us"; // se cambio porque daba el error "No LID for user"
    // chatId = chatId.replaceAll('.', '') + "@s.whatsapp.net ";

    /*if (chatId.endsWith('@lid')) {
        const lidMatch = chatId.match(/^(\d+):\d+@lid$/);
        if (lidMatch && lidMatch[1]) {
            chatId = lidMatch[1] + '@lid';
        }
    }*/
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log('+         chatId after processing:', chatId)
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')

    return chatId
}


// Genera una cadena aleatoria de string de longitud n
function genRandStr(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


////////////////////////////////////////////////////////////////////////
// Procesa los mensajes recibidos por el websocket
////////////////////////////////////////////////////////////////////////
async function processMessage(wsPeer: {}, JSONmessage: string) {

    const message = JSON.parse(JSONmessage)
    console.log('1) SendDocto processMessage transport =', message.transport)
    const transport = message.transport && typeof message.transport == 'string' ? message.transport.toLowerCase() : ''

    if (transport === 'whatsapp') {
        const job = message.job
        const data = message.data
        let textMessage
        let phone = ''

        console.log('>>>>>>>   message WhatsApp =', job, data)
        switch (true) {

            case job == 'init':

                if (!WhatsAppInit) {
                    console.log('>>>>>>> Llama Initializing WhatsApp>>>>>>>>>>>>>>');
                    whatsApp.initialize();
                } else {
                    webSocketPeer.send({ result: 'WhatsAppReady', data: whatsAppReady });

                }
                break;

            case job === 'open':
                const res = { whatsAppReady }

                if (!WhatsAppInit) {
                    console.log('WhatsApp Not initialized - res=', res);
                    wsPeer.send({
                        result: 'NoReady',

                    })

                    return
                }

                console.log('WhatsApp initialized res=', res);

                //  wsPeer.send(JSON.stringify({ result: 'Ready' }))
                wsPeer.send({
                    result: 'Ready',
                    data: whatsAppReady
                })

                if (!whatsAppReady && QrCode >= '           ') {  // Si no esta vinculado WhatsApp manda el QR

                    console.log('res =====>QR Code:', QrCode);

                    //webSocketPeer.send(JSON.stringify({
                    wsPeer.send({
                        result: 'QrCode',
                        data: QrCode
                    })

                }
                break;
            case job === 'sendMessage':
                console.log('Mensaje a enviar:', data.textMessage)
                phone = data.phone
                textMessage = data.message
                if (whatsAppReady) {
                    try {
                        const chatId = genChatId(phone)

                        whatsApp.sendMessage(chatId, textMessage);
                        webSocketPeer.send({
                            result: 'sentWhatsApp',
                            data: 'Mensaje enviado'
                        });
                    }
                    catch (err) {
                        console.log('Error:', err)
                        webSocketPeer.send({
                            result: 'wahtsAppError',
                            data: err
                        });
                    }
                }
                break;
            case job === 'sendMedia':
                // Envia media
                // phone = numero de telefono
                // base64Image = imagen en formato base64
                // type = tipo de archivo (image/png, video/mp4, audio/mp3)

                if (whatsAppReady) {
                    phone = data.phone
                    textMessage = data.message

                    try {
                        const chatId = genChatId(phone)
                        console.log('chatId:=====>>>', chatId, 'Message:=====>>>', textMessage)
                        whatsApp.sendMessage(chatId, textMessage);

                        const fileData = data.attachments
                        for (const attach in fileData) {
                            const fileName = fileData[attach].fileName
                            let type = fileData[attach].type

                            let fileB64 = fileData[attach].fileB64 ? fileData[attach].fileB64 : false
                            let file = fileData[attach].file
                            if (!fileB64) {  // Convertimos para trasmitir
                                file = Buffer.from(file, 'utf-8').toString('base64');
                            }

                            switch (true) {
                                case type === 'pdf':
                                    type = 'application/pdf'
                                    break
                                case type == '.doc':
                                    type = 'application/msword'
                                    break
                                case type == '.docx':
                                    type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                    break
                                case type == '.xls':
                                    type == 'application/vnd.ms-excel'
                                    break
                                case type == '.xlsx':
                                    type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                    break

                                case type == 'xml':
                                    type = 'application/xml'
                                    break
                                case type == 'png' || type == 'jpg' || type == 'jpeg' || type == 'gif' || type == 'bmp':
                                    type = `ìmage/${type}`
                                    break

                            }
                            console.log('*********************************************************')

                            if (file.length > 0) {
                                const media = new MessageMedia(type, file, fileName);
                                console.log('media:=====>>>', media)
                                console.log('*********************************************************')
                                whatsApp.sendMessage(chatId, media, { caption: `¡Aquí tienes el archivo ${fileName} !` });
                                webSocketPeer.send({
                                    result: 'sentWhatsApp',
                                    data: `Archivo ${fileName} enviado`
                                });

                            }
                        }

                    }
                    catch (err) {
                        console.log('Error:', err)
                        webSocketPeer.send({
                            result: 'wahtsAppError',
                            data: err
                        });
                    }
                }

                break;
            case job === 'sendMediaUrl':

                phone = data.phone
                const url = data.url

                if (whatsAppReady) {
                    let chatId = genChatId(phone)
                    try {
                        //const media = await MessageMedia.fromUrl(url);
                        const media = MessageMedia.fromUrl(url);
                        whatsApp.sendMessage(chatId, media);
                        webSocketPeer.send({
                            result: 'sentWhatsApp',
                            data: 'Mensaje enviado'
                        });

                    }
                    catch (err) {
                        console.log('Error:', err)
                        webSocketPeer.send({
                            result: 'wahtsAppError',
                            data: err
                        });
                    }
                }
                break;

        }

    }
    if (transport == 'mail') {
        // const data = message.data
        const to = message.to
        const subject = message.subject
        const text = message.text
        const attachments = message.attachments

        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        const mailServer = await useStorage().getItem('mail:Server');
        console.log('2) sendDocto SendMail====>>> mailServer=', mailServer)
        if (!mailServer) {
            webSocketPeer.send({
                result: 'mailError',
                data: 'No se encontro el definido del servidor de correo'
            });
            console.log('2) Error sendDocto SendMail====>>> mailServer=', mailServer)
            return
        }

        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')

        const fileAttachments = []


        if (attachments) {
            for (const attach in attachments) {
                //  console.log('++++++++++++++++++++++++++++++attach', attachments[attach])
                let type = attachments[attach].type // tipo de archivo (image/png, video/mp4, audio/mp3,'application/pdf' )
                // const fileName = `_mail_${Date.now()}_${attachments[attach].fileName}.${type}`
                const fileName = `_mail_${attachments[attach].fileName}`
                const path = join(os.tmpdir(), fileName);
                const fileB64 = attachments[attach].fileB64 ? attachments[attach].fileB64 : false
                let file = attachments[attach].file ? attachments[attach].file : ''

                if (fileB64) {
                    const Bufer = Buffer.from(file, 'base64'); // convertimos bas64 a buffer
                    fs.writeFileSync(path, Bufer);
                } else
                    fs.writeFileSync(path, file);

                switch (true) {
                    case type === 'pdf':
                        type = 'application/pdf'
                        break
                    case type == '.doc':
                        type = 'application/msword'
                        break
                    case type == '.docx':
                        type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                        break
                    case type == '.xls':
                        type == 'application/vnd.ms-excel'
                        break
                    case type == '.xlsx':
                        type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                        break
                    case type == 'xml':
                        type = 'application/xml'
                        break
                    case type == 'png' || type == 'jpg' || type == 'jpeg' || type == 'gif' || type == 'bmp':
                        type = `ìmage/${type}`
                        break


                }
                const fileAttach = {
                    filename: fileName,
                    path: path,
                    contentType: type
                }
                fileAttachments.push(fileAttach)

            }
        }

        // Retrieve a value

        const fromMail = mailServer?.from ? mailServer.from : ''
        if (mailServer && mailServer['from'])
            delete mailServer['from']

        const transporter = nodemailer.createTransport(mailServer)
        await transporter.verify();
        console.log("Server is ready to take our messages");
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')

        const mailOptions = {
            from: `${fromMail}`, // sender address
            to: `${to}`, // list of receivers
            subject: `${subject}`, // Subject line
            text: `${text}`, // plain text body
            //  html: "<b>Hello world?</b>", // HTML version of the message
            attachments: fileAttachments,
            /*
            headers: {
                'List-Unsubscribe': '<mailto:unsubscribe@gova.com.mx>',
                'X-Entity-Ref-ID': Date.now().toString()
            }
            */
        }



        //   (async () => {

        try { // send mail with defined transport object
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
            console.log("Sending mail");
            const info = await transporter.sendMail(mailOptions);
            console.log("Message sent: %s", info.messageId);
            // Preview URL is only available when using an Ethereal test account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
            webSocketPeer.send({
                result: 'sentMail',
                data: info
            });
            console.log('finally :', info)

        } catch (err) {
            console.error("Error while sending mail", err);
            webSocketPeer.send({
                result: 'mailError',
                data: err
            });

        } finally {
            deleteFiles(fileAttachments)

        }
        //     })()

    }

}
const deleteFiles = (fileAttachments: []) => {

    for (let i = 0; i < fileAttachments.length; i++) {
        const path = fileAttachments[i].path
        try { fs.unlinkSync(path); }
        catch (error) {
            console.log('Error deleting file:', error)
            webSocketPeer.send({
                result: 'sendMail',
                data: error
            })
        }
    }

}

/*

async function leeCfdi(dialect: string, tdo_tdo: string, ndo_doc: number) {

    if (dialect === 'mssql') {
        const sql = `select * from comexml where tdo_tdo = ${tdo_tdo} and ndo_doc = ${ndo_doc}`
        const result = await executeMSSQL(sql)
        return result
    }
    if (dialect === 'postgres') {

    }


}

const executeMSSQL = async (sql) => {
    let connection = new Connection(config);
    connection.connect((err) => {
        if (err)
            return callback(err, null);
        const request = new Request(sql, (err, rowCount, rows) => {
            connection.close();
            if (err)
                return callback(err, null);
            callback(null, { rowCount, rows });
        });

        connection.execSql(request);
    });
};
*/