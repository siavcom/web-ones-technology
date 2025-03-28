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
    //this.prop.Value = "Borrar"
    this.prop.Visible = false

    this.prop.Capture = false

    this.prop.Image = "/Iconos/svg/delete2-color.svg";

    this.prop.TabIndex = 1
    this.prop.ToolTipText = 'Borra'

    this.style.fontSize = '10px'
    this.style.width = '30px'


  } // Fin constructor

  async click() {
    await localAlaSql(`delete from ${this.Parent.prop.RecordSource}`)
    this.Parent.table.grabaTabla()
    this.prop.Visible = false

  }


}
