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
    /* 
      const comedoc = await goto(0, 'vi_cap_comedoc');
      const Json = comedoc.obs_unn && comedoc.obs_unn.trim().length > 10 ? comedoc.obs_unn : '';
  
      let mailJson = {};
      try {
        mailJson = JSON.parse(Json);
      } catch (error) {
        mailJson = {};
      }
      let messageSend = mailJson.text ? mailJson.text : `Envio de documento <<tdo_tdo>> número <<ndo_doc>>`;
      messageSend = messageSend.replace('<<des_tdo>>', comedoc.des_tdo).replace('<<ndo_doc>>', comedoc.ndo_doc.toString());
      this.Form.data_detail.messageSend.prop.Value = messageSend;
      this.Form.data_detail.email.prop.Value = comedoc.ema_nom;
      this.Form.data_detail.phone.prop.Value = comedoc.tel_nom;
  */
    return

  }


  // desconectamos el servidor web-sockets al cerrar

}

/*
Enviar correo electrónico a: siavcom@hotmail.com  Para cambiar el correo electrónico al cual se le están haciendo llegar las facturas electrónicas y/o envió de comprobantes de pago.

 

Aviso de confidenciablilidad : Los datos e información de este correo es exclusivo para el uso interno y adminstrativo de Siavcom Software S. de R.L. de C.V.

No nos hacemos responsables de la mal uso que se le de a este correo .


Atte.

 Luz Margarita Gonzalez Garcia

Av. Cucba 618-A  45221 Zapopan Jalisco


Telefono: (33) 3915-9161, 3620-3930

www.siavcom.com.mx



*/