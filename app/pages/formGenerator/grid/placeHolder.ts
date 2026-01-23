//////////////////////////////////////////////
// Clase : placeHorder
// Descripcion : Place holder
// @author: Fernando Cuadras Angulo
// Creacion : 16/Octubre/2022
// Ult.Mod  : 18/Octubre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class placeHolder extends COLUMN {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.Order = 3
    this.prop.ColumnTextLabel = 'PlaceHolder'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_for.placeholder'
    this.prop.ToolTipText = 'PlaceHolder'
    this.prop.Placeholder = "PlaceHolder"
    //  this.style.flexBasis = '30%' /* width/height  - initial value: auto */
    this.style.width = '150px'
  }

}
