//////////////////////////////////////////////
// Clase : bt_obtener
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_obtener extends COMPONENT {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Value ='Obtener'
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/report-document.svg"        //print-color3.svg";
    this.prop.TabIndex = 1
    this.style.width='40px'

  } // Fin constructor

  async click() {
    this.Form.tabla.prop.RowSource = ''
    console.log('bt_print===>>>',this.Form.browseResult.prop.RowSource)  
  }


}
