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



  }   // Fin Procedure

}



