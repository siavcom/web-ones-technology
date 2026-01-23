//////////////////////////////////////////////
// Clase : bt_add
// @author: Fernando Cuadras Angulo
// Creacion : Marzo/2023
/////////////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
/**
*
*
* @export
* @class bt_add
* @extends {COMPONENT}
*/
export class bt_view extends COMPONENT {

  constructor() {
    super()
    this.Index = 1
    this.prop.BaseClass = 'imgButton'
    this.prop.Caption = 'Ver'
    this.prop.Position = 'footer'
    this.prop.Image = "/Iconos/svg/glasses.svg";
    this.prop.ToolTipText = 'Ver condicion'
    this.captionStyle.fontSize = '10px'
    this.style.width = '55px'
    this.prop.Visible = false
  } // Fin constructor

  override async click() {
    this.prop.Visible = false
    await this.Parent.Grid.saveTable()
    this.Parent.nco_que.prop.sw_add = false
    this.Parent.nco_que.interactiveChange()

  }


}
