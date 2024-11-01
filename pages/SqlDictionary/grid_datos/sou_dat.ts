//////////////////////////////////////////////
// Clase : sou_dat
// Descripcion : RowSource para ComboBox
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class sou_dat extends COLUMN {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.Order = 3
    this.textLabel = 'RowSource ComboBox'
    this.prop.Type = 'text'
    this.prop.Type = 'textArea'
    this.prop.ControlSource = 'vi_cap_comedat.sou_dat'
    this.prop.Placeholder = "RowSource ComboBox"
    this.style.width = '200px'
    //  this.style.flexBasis = '30%' /* width/height  - initial value: auto */
  }

  ////////////////////////////////// 
  // Evento When
  ///////////////////////////////////
  async when() {
    this.prop.ReadOnly = false
    if (!await this.Parent.cam_dat.when()) {
      this.prop.ReadOnly = true
      return !this.prop.ReadOnly
    }

  }




}
