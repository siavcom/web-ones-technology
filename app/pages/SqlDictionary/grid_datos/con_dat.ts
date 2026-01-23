//////////////////////////////////////////////
// Clase : con_dat
// Descripcion : Consecutivo 
// Obs: es la primer columna 
// @author: Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  22/Junio/2022
/////////////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class con_dat extends COLUMN {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.Order = 1
    this.prop.ColumnTextLabel = 'Consecutivo'
    this.prop.BaseClass = 'editText'
    this.prop.Type = 'number'
    this.prop.Min = '0'
    this.prop.Max = '256'
    this.prop.Decimals = 0
    this.prop.ControlSource = 'vi_cap_comedat.con_dat'
    this.prop.Placeholder = "Consecutivo/Orden "
    this.prop.ToolTipText = 'Consecutivo/Orden'
    this.style.width = '45px'
    //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
    //      this.prop.Autofocus=true

  }
  async when() {
    this.prop.Valid = true
    return true

  }
}