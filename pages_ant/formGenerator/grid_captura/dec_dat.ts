//////////////////////////////////////////////
// Clase : dec_dat
// Descripcion : Decimales del dato
// Author : Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  22/Junio/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class dec_dat extends COLUMN {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.Order = 3
    this.textLabel = 'Deci- males'
    this.prop.BaseClass = 'editText'
    this.prop.Type = 'number'
    this.prop.Decimals = 0
    this.prop.ControlSource = 'vi_cap_grd.dec_dat'
    this.prop.ReadOnly=true

    this.prop.Placeholder = "Decimales de precisión"
    this.prop.ToolTipText = "Decimales de precisión"
    //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
    this.style.width = '20px'
  }

 
}
