/**
 *
 * @description Boton para timbrar CFDI
 * @export
 * @class bt_send
 * @extends {IMGBUTTON}
 */
export class Bt_send extends IMGBUTTON {

  constructor() {
    super()
    this.Index = 1
    this.prop.Capture = false;

    this.prop.Image = "/Iconos/svg/send.svg"        //print-color3.svg";

    this.prop.Caption = 'Enviar'
    this.style.width = '60px'
    this.style.float = "left"
  } // Fin constructor

  override async click() {
    this.Form.data_detail.sendData()
  }   // Fin Procedure


}
