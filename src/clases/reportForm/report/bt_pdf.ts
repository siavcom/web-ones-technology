//////////////////////////////////////////////
// Clase : bt_pdf
// Author : Fernando Cuadras Angulo
// Creacion : 25/May/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_pdf extends COMPONENT {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Value ='Pdf'
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/pdf-file.svg"        //print-color3.svg";
    this.prop.TabIndex = 1
    this.prop.Visible=false
    this.style.width='40px'

  } // Fin constructor

  async click() {
    this.Form.tabla.prop.RowSource = ''
    console.log('bt_pdf===>>>',this.Form.browseResult.prop.RowSource)  
  }


}
