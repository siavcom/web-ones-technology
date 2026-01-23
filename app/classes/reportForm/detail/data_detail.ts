//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// @baseClass  : Container
// @class : data_detail
// Description : Contenedor de datos de Mail y WhatsApp para enviar documentos
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2025-12-15
// Update Date  : 2026-01-05
/////////////////////////////////////////////

/////////////////// Server WebSocket /////////////////////

const { status, data, send, open, close } = useWebSocket(`ws://${location.host}/api/sendDocto`, {
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
      alert('Failed to connect WebSocket after 3 retries')
    },
  },
  autoClose: false
  /*heartbeat: {
    message: 'ping',
    interval: 1000,
    pongTimeout: 1000,
  },
*/
})

let whatsappReady = ref(false);
let whatsAppQR = ref("");
let transport = ref("");


// public unWatch = unWatch();

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { CONTAINER } from "@/classes/Container";

/////////////////////////////////////////
// Component import
//////////////////////////////////////
import { PHONE } from "./phone";
import { SUBJECT } from "./subject";
import { MESSAGESEND } from "./menssageSend";
import { EMAIL } from "./email";
import { Bt_send } from "./Bt_send";
import { Bt_close } from "./Bt_close";
import { DISPLAYQR } from "./displayQr";

export class data_detail extends CONTAINER {
  transport = ''

  QRVisible = computed(() => {
    return transport.value == 'whatsapp' && !whatsappReady.value ? true : false;
  });

  DataVisible = computed(() => {
    return transport.value == 'whatsapp' && !whatsappReady.value ? false : true;
  });

  ///////////////// whatch Server WebSocket /////////////////////
  private unWatch = watch(data, (newData) => {

    // console.log('watch NewData=>>>>>', newData)

    if (!newData) return;

    const data = JSON.parse(newData)
    //const data = newData
    const result = data.result

    //console.log('watch result=', result, ' data=', data)

    switch (true) {

      case result == 'NoReady':
        whatsappReady.value = false
        //   console.log('1) WhatsApp Not Ready=', data.data)
        //   const router = useRouter();
        //   router.push('/WhatsApp/Pro/Vincular');
        return;

      case result == 'WhatsAppReady':
        //  console.log('1) WhatsApp Ready=', data.data)
        if (data.data) {
          whatsappReady.value = true;
        }
        whatsAppQR.value = ''
        // MessageBox('WhatsApp listo', 1, "WhatsApp");
        //   this.Form.data_detail.block[0].prop.Visible = false
        //  this.Form.data_detail.block[1].prop.Visible = true
        //   this.Form.data_detail.block[2].prop.Visible = true
        return

        break


      case result == 'QrCode':

        whatsAppQR.value = data.data
        console.log(' transport QrCode=', whatsAppQR.value)
        return
        break

      case result == "message" && this.displayQr.prop.Visible:
        //  console.log('WebSocket message=', data.data)
        // 0=mensaje sin titulo
        // 1=Informacion solamente
        // 2=? pregunta Cancel Abort Retry
        // 4=? pregunta No Ok
        MessageBox(data.data, 1, "Message");
        return
        break

      case result == 'error':
        MessageBox(data.data, 16, "Web Socket Error ");
        return
        break
      case result == 'sentMail':
        MessageBox(`From: ${data.data.envelope.from} To: ${data.data.envelope.to[0]} `, 1, "Mail sent OK ");
        return
        break
      case result == 'mailError':
        MessageBox(data.data, 16, "Mail sent Error ");
        return
        break
      case result == 'whatsAppError':
        MessageBox(data.data, 16, "Whatsapp sent Error ");
        return
        break
      default:
        console.log('WebSocket default, result=', result, ' data=', data.data)
        return
        break

    }

  })

  public displayQr = new DISPLAYQR()
  public phone = new PHONE()
  public subject = new SUBJECT();
  public email = new EMAIL()
  public messageSend = new MESSAGESEND()
  public Bt_send = new Bt_send();

  public Bt_close = new Bt_close();

  constructor() {
    super()

    this.prop.BaseClass = 'modalContainer'   //'modalContainer'
    this.prop.Visible = false
    this.style.width = '80%'

    this.displayQr.prop.Value = ref(whatsAppQR) // pasamos por referencia el valor

    //this.displayQr.prop.Value = QRVisible // pasamos por referencia el valor

    // =======================<Bloque 0 >===============
    const container = this.container

    this.block[0] = structuredClone(container)
    this.block[0].component = {
      [0]: this.displayQr,

    }
    this.block[0].title = 'Vincular WhatsApp'
    this.block[0].prop.Visible = this.QRVisible //.value // computed
    this.block[0].Style = {
      display: 'flex',
      justifyContent: 'center',
      fontSize: "20px",
      fontWeight: "bold"
    }

    // =======================<Bloque 1 >=====================

    this.block[1] = structuredClone(container)
    this.block[1].component = {
      [0]: this.phone,
      [1]: this.email,
      [2]: this.subject,
      [3]: this.messageSend,

    }
    this.block[1].title = 'Datos'
    this.block[1].prop.Visible = this.DataVisible //.value
    this.block[1].Style = {
      display: 'flex',
      justifyContent: 'center',
      fontSize: "20px",
      fontWeight: "bold"
    }

    // =======================<Bloque 2 >=====================

    this.Bt_send.prop.Visible = transport.value == 'whatsapp' ? !this.QRVisible.value : true;

    this.block[2] = structuredClone(container)
    this.block[2].component = {
      [0]: this.Bt_send,
      [1]: this.Bt_close
    }
    this.block[2].style = {
      display: 'inline-flex',
      gap: '300px',  // Espacio entre botones
      padding: '8px'
    }
    //display: inline-flex;
    this.block[2].prop.Visible = true;
    this.Bt_send.prop.Visible = this.DataVisible;

  }

  async open(transporte: string) {
    transport.value = transporte.toLowerCase();

    if (transport.value == 'whatsapp') {
      this.Form.data_detail.phone.prop.Visible = true;
      this.Form.data_detail.email.prop.Visible = false;
    } else {
      this.Form.data_detail.phone.prop.Visible = false;
      this.Form.data_detail.email.prop.Visible = true;
    }

    const comedoc = await goto(0, 'vi_cap_comedoc');
    const Json = comedoc.obs_unn && comedoc.obs_unn.trim().length > 10 ? comedoc.obs_unn : '';
    let mailJson = {};
    try {
      mailJson = JSON.parse(Json);
    } catch (error) {
      mailJson = {};
    }


    //this.Form.data_detail.block[1].prop.Visible = true
    //this.Form.data_detail.block[2].prop.Visible = true
    let tipo = ''

    switch (true) {
      case comedoc.tip_cfd == 'I' || comedoc.tip_cfd == 'E':
        tipo = 'CFDI'
        break
      case comedoc.tip_cfd == 'I':
        tipo = 'Complemento de pago'
        break
      case comedoc.tip_cfd == 'T':
        tipo = 'Carta porte/Traslado'
        break
    }

    this.Form.data_detail.subject.prop.Value = `Envio de ${tipo} ${comedoc.tdo_tdo} número ${comedoc.ndo_doc}  de ${Public.value.nem_pge.trim()}. Ref: ${comedoc.ref_doc.trim()}  `;
    let messageSend = mailJson.text ? mailJson.text : this.Form.data_detail.subject.prop.Value
    messageSend = messageSend.replace('<<des_tdo>>', comedoc.des_tdo).replace('<<ndo_doc>>', comedoc.ndo_doc.toString());
    this.Form.data_detail.messageSend.prop.Value = messageSend;
    this.Form.data_detail.email.prop.Value = this.Form.data_detail.email.prop.Value > ' ' ? this.Form.data_detail.email.prop.Value : comedoc.ema_nom;
    this.Form.data_detail.phone.prop.Value = this.Form.data_detail.phone.prop.Value > ' ' ? this.Form.data_detail.phone.prop.Value : comedoc.tco_nom;

    //const mailFrom = mailJson.from ? mailJson.from : ''

    this.Form.block[this.Form.data_detailBlock].prop.Visible = true; // Mostrar el bloque de entrada de datos

    this.block[1].title = 'Datos ' + transporte.toUpperCase()

    this.Form.report.displayPdf.prop.Visible = false

    this.prop.Visible = true

    if (transport.value == 'whatsapp' && !whatsappReady.value) {
      /*
            let message = {
              transport: 'whatsapp',
              job: 'open',
            }
            send(JSON.stringify(message))
      */
      const message = {
        transport: 'whatsapp',
        job: "init",

      }

      send(JSON.stringify(message))
      //  MessageBox("WhatsApp no está listo aún. Vincule WhatsApp desde tu celular.", 1, "Advertencia");
      //   const router = useRouter();
      //   router.push('/WhatsApp/Pro/Vincular');

    }

    this.block[2].prop.Visible = true  // botones de control bt_send y bt_close

  }

  async close() {
    this.prop.Visible = false
    this.Form.block[this.Form.data_detailBlock].prop.Visible = false; // Mostrar el bloque de entrada de datos
    this.Form.report.displayPdf.prop.Visible = true
  }

  // Envio de mensaje por servidor web-sockets sendDocto
  async sendData() {

    this.Form.data_detail.close()

    const attachments = await this.Form.attachFiles()
    let message = {}

    if (transport.value == 'whatsapp') {
      let phone = this.Form.data_detail.phone.prop.Value.replaceAll('+', '')
      phone = phone.replaceAll(' ', '')
      phone = phone.replaceAll('-', '')
      phone = phone.replaceAll('(', '')
      phone = phone.replaceAll(')', '')
      phone = phone.replaceAll('.', '')
      phone = phone.trim()
      if (phone.slice(0, 2) == '52') {  // Numeros de Mexico
        if (phone.length == 12) {
          phone = phone.replace('52', '521')
        }
      }
      if (phone - length == 10)  // telefonos de México
        phone = '521' + phone
      console.log('phone length:', phone, phone.length)
      if (phone.length != 13) {
        this.Form.data_detail.open(transport.value)
        this.Form.data_detail.phone.prop.ErrorMessage = 'El número de teléfono debe tener 12 o 13 dígitos'
        this.Form.data_detail.phone.prop.Valid = false

        return
      }

      message = {
        transport: 'whatsapp',
        job: 'sendMedia',
        data: {
          phone: phone,
          message: this.Form.data_detail.messageSend.prop.Value,
          attachments
        }
      }

    }

    if (transport.value == 'mail') {
      const comedoc = goto(0, 'comedoc')

      const Json = comedoc.obs_unn && comedoc.obs_unn.trim().length > 10 ? comedoc.obs_unn : '';

      let mailJson = {};
      let mailFrom = '';

      try {
        mailJson = JSON.parse(Json);
        // mailFrom = mailJson.from ? mailJson.from : '';
      } catch (error) {
        mailJson = {};
        // MessageBox('Error obteniendo datos del del mail ')
      }

      message = {
        transport: 'mail',
        //  from: mailFrom,
        to: this.Form.data_detail.email.prop.Value,
        subject: this.Form.data_detail.subject.prop.Value,
        text: this.Form.data_detail.messageSend.prop.Value,
        attachments

      }

    }
    // El mensaje se enviará a través del boton de  WhatsApp
    //console.log('Sending message via WebSocket:', message);
    send(JSON.stringify(message));
    //this.Form.bt_whatsApp.send(message)

  }

  // desconectamos el servidor web-sockets al cerrar
  override onUnmounted(): void {
    if (this.unWatch) {
      this.unWatch();
    }
  }



}
