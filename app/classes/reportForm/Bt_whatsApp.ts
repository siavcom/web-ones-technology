/**
 *
 * @description Boton para timbrar CFDI
 * @export
 * @class bt_imprime
 * @extends {IMGBUTTON}
 */


export class Bt_whatsApp extends IMGBUTTON {
  // public data_detail = new data_detail();

  constructor() {
    super()
    this.Index = 1
    this.prop.Capture = false;

    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/WhatsAppColor.svg"        //print-color3.svg";
    this.prop.Visible = false;
    this.prop.Caption = 'Envia docuemnto'
    this.prop.ToolTipText = 'Enviar documento por WhatsApp';
    this.style.width = '84px'


  } // Fin constructor

  override async click() {

    this.Form.data_detail.open('whatsapp')

    return

  }


  // desconectamos el servidor web-sockets al cerrar

}

