//////////////////////////////////////////////
// Clase : bt_print
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
////import { MessageBox } from '@/classes/Functions';
/**
 *
 *
 * @export
 * @class BT_ACEPTAR
 * @extends {COMPONENT}
 */
export class bt_print extends COMPONENT {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.textLabel =' Imprimir '
    this.prop.Position = 'footer'
    this.prop.Value = "";
    this.prop.Capture = false;
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/print-color2.svg";
    this.prop.TabIndex = 1
    this.prop.RecordSource=''


  } // Fin constructor

  async click() {
    this.Form.tabla.prop.RowSource = ''
    console.log('bt_print===>>>',this.Form.browseResult.prop.RowSource)  
  }


}
