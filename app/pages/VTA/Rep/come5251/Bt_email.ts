/**
 *
 * @description Boton para timbrar CFDI
 * @export
 * @class bt_imprime
 * @extends {IMGBUTTON}
*/
export class Bt_email extends IMGBUTTON {

  constructor() {
    super()
    this.Index = 1
    this.prop.Capture = false;

    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/email.svg"        //print-color3.svg";
    this.prop.Visible = false;
    this.prop.Caption = 'Envia documento ';
    this.prop.ToolTipText = 'Enviar documento por correo electrónico';
    this.style.width = '84px'

  } // Fin constructor
  override async click() {
    //this.Form.data_detail.open('mail')
    this.Form.data_detail.open('mail')

    /* 
    
       const comedoc = await goto(0, 'vi_cap_comedoc');
       const Json = comedoc.obs_unn && comedoc.obs_unn.trim().length > 10 ? comedoc.obs_unn : '';
       let mailJson = {};
       try {
         mailJson = JSON.parse(Json);
       } catch (error) {
         mailJson = {};
       }
   
       this.Form.data_detail.block[0].prop.Visible = false
       this.Form.data_detail.block[1].prop.Visible = true
       this.Form.data_detail.block[2].prop.Visible = true
   
   
       this.Form.data_detail.open('mail')
       this.Form.data_detail.subject.prop.Value = `Envio de documento ${comedoc.tdo_tdo} número ${comedoc.ndo_doc}  de ${Public.value.nem_pge}   `;
       let messageSend = mailJson.text ? mailJson.text : this.Form.data_detail.subject.prop.Value
       messageSend = messageSend.replace('<<des_tdo>>', comedoc.des_tdo).replace('<<ndo_doc>>', comedoc.ndo_doc.toString());
       this.Form.data_detail.messageSend.prop.Value = messageSend;
       this.Form.data_detail.email.prop.Value = comedoc.ema_nom;
       this.Form.data_detail.phone.prop.Value = comedoc.tel_nom;
   
      
   */

  }   // Fin Procedure

}



