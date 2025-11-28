//////////////////////////////////////////////
// Clase : bt_delete
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
export class bt_delete extends COMPONENT {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Position = 'footer'
    this.prop.Caption = "Borrar"
    this.prop.Visible = false
    this.prop.Image = "/Iconos/svg/delete2-color.svg";
    this.prop.ToolTipText = 'Borra toda la condicio'
    this.captionStyle.fontSize = '10px'
    this.style.width = '50px'


  } // Fin constructor

  async click() {
    await localAlaSql(`delete from ${this.Parent.prop.RecordSource}`)
    this.Parent.table.saveTable()
    this.prop.Visible = false

  }


}
