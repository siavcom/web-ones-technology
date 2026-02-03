//////////////////////////////////////////////
// Clase : close
// @author: Fernando Cuadras Angulo
// Creacion : 29/May/2023
/////////////////////////////////////////////

/** 
* Clase : close
* Author : Fernando Cuadras Angulo
* Creacion : 29/May/2023
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class Bt_close extends IMGBUTTON {

  constructor() {
    super()
    this.prop.BaseClass = 'imgButton'
    this.prop.Value = ''
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/close-color.svg"        //print-color3.svg";
    this.prop.TabIndex = 1
    this.prop.Visible = true
    this.prop.ToolTipText = 'Close detail'
    this.style.width = '60px'
    this.style.float = "right"

  } // Fin constructor

  override async click() {
    this.Form.data_detail.close();
    this.Form.bt_whatsApp.prop.Visible = true
    this.Form.bt_email.prop.Visible = true
  }

}
