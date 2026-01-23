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
export class bt_close extends IMGBUTTON {

  constructor() {
    super()
    this.prop.BaseClass = 'imgButton'
    this.prop.Value = ''
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/close-color.svg"        //print-color3.svg";
    this.prop.TabIndex = 1
    this.prop.Visible = true
    this.prop.ToolTipText = 'Close report'
    this.style.width = '60px'

  } // Fin constructor

  override async click() {

    this.Form.report.displayPdf.prop.Source = ''
    this.Form.report.displayPdf.prop.Visible = false
    this.Form.block[6].prop.Visible = false
    this.Form.blick[0].prop.Visible = true
    this.Form.blick[1].prop.Visible = true
    this.Form.blick[2].prop.Visible = true
    this.Form.ndo_doc.setFocus()

  }


}
