//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// @baseClass  : captureForm
// @class : manComebpe
// Description : Capture Form
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

//import { Socket, io } from "socket.io-client";
import { DISPLAYQR } from "./displayQr";
import { PHONE } from "./phone";
import { MESSAGESEND } from "./menssageSend";

const { status, data, send, open, close } = useWebSocket(`ws://${location.host}/api/sendDocto`, {
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
      alert('Failed to connect WebSocket after 3 retries')
    },
  },
  /* heartbeat: {
     message: 'ping',
     interval: 1000,
     pongTimeout: 1000,
   },*/
})

let thisForm: ThisForm

let DisplayQr
let Phone
let MessageSend
let whatsappReady: boolean = false;
let whatsAppQR = ref("");

///////////////////////////////////////
// Base class
///////////////////////////////////////

/// import { FORM } from "@/classes/Form";


export class ThisForm extends FORM {
  // socket;

  sw_QR: boolean = true;
  ////////////////////////////////////
  // component imported
  ////////////////////////////////////

  public displayQr = new DISPLAYQR();
  public phone = new PHONE()
  public messageSend = new MESSAGESEND()

  unWatch = watch(data, (newData) => {

    //  console.log('watch NewData=>>>>>', newData)

    const data = JSON.parse(newData)
    //const data = newData
    const result = data.result

    console.log('watch result=', result, ' data=', data.data)

    switch (true) {
      case result == 'QrCode':

        whatsAppQR.value = data.data
        console.log('QrCode=', data.data)
        return
        break

      case result == 'WhatsAppReady':

        if (data.data) {
          console.log('2) WhatsApp Ready=', data.data)
          MessageBox('Se vinculo el telefono al whatsApp');
          const Router = useRouter()
          Router.back()
          return
        }
        return

        break

      case result == "message" && this.displayQr.prop.Visible:
        console.log('WhatsApp message=', data.data)
        // 0=mensaje sin titulo
        // 1=Informacion solamente
        // 2=? pregunta Cancel Abort Retry
        // 4=? pregunta No Ok
        MessageBox(data.data, 1, "Mensaje de WhatsApp de " + data.data.from);
        return
        break

      case result == 'error':
        MessageBox(data.data, 16, "WhatsApp Error ");
        return
        break

      default:
        console.log('WhatsApp default, result=', result, ' data=', data.data)
        return
        break

    }

  })

  constructor() {
    super(); // inicializa la clase base
    DisplayQr = ref(this.displayQr)
    Phone = ref(this.phone)
    MessageSend = ref(this.messageSend)

    thisForm = this
    this.Development = false;
    this.Name = "Vincular";
    this.prop.Caption = "Vincular WhatsApp";

    const runtimeConfig = useRuntimeConfig()
    const whatsAppServer = runtimeConfig.public.whatsAppServer[0] // lee del archivo de configuracion
    this.displayQr.prop.Value = ref(whatsAppQR) // pasamos por referencia el valor


  }

  override async init() {
    //  const response = await this.Form.socket.emitWithAck("leeQR");
    //    this.displayQr.prop.Value = +(response.QR)
    // console.log('Host=', window.location.host)
    console.log('Location=', location.host)

    //    this.sendMessage('0123456789')
    const message = {
      transport: 'whatsapp',
      job: "init",

    }

    const myJson = JSON.stringify(message)
    console.log('Sending message:', myJson);
    send(myJson)

    console.log('Init WhatsApp ')
    // this.socket.emit('isReady')
  }

  public sendMessage(message: {}) {
    send(message)
  }


  public propComponent(Component: {}, prop: string, Value: any) {
    Component.value[prop] = Value
    console.log('Component=', Component.value.prop)
    console.log('prop=', prop)
    console.log('Value=', Value)
  }

  override onUnmounted() {
    console.log('Unwatching WhatsApp form');
    this.unWatch();
  } // End ThisForm

}