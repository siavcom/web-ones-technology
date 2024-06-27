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
    this.textLabel = 'Decimales'
    this.prop.BaseClass = 'editText'
    this.prop.Type = 'number'
    this.prop.Min = '0'
    this.prop.Max = '20'
    this.prop.Decimals = 0
    this.prop.ControlSource = 'vi_cap_comedat.dec_dat'

    this.prop.Placeholder = "Decimales de precisión"
    this.prop.ToolTipText = "Decimales de precisión"
    this.style.flexBasis = '30%' /* width/height  - initial value: auto */
    this.style.width = '50px'
  }

  ////////////////////////////////// 
  // Evento When
  ///////////////////////////////////
  async when() {
    if (this.Parent.tip_dat.prop.Value != 'N' &&
      this.Parent.tip_dat.prop.Value != 'D') {
      this.prop.Value = '0'
      this.prop.ReadOnly = true
      this.prop.Valid = true

      return !this.prop.ReadOnly
    }

    this.prop.ReadOnly = await !this.Parent.cam_dat.when()
    return !this.prop.ReadOnly
    //   await super.when(row)
  }

  async valid() {

    if (this.prop.Value + this.Parent.lon_dat.prop.Value > 38) {
      this.prop.ErrorMessage = 'La suma longitud+decimales no debe exeder 38'
      return false
    }

    return true

  }


}
