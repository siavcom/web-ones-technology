//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : med_cpy
// Description : Medida
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";
export class med_cpy extends COLUMN {

  constructor() {
    super()

    this.prop.ColumnTextLabel = 'Medida solicitada' // Column Header
    this.prop.BaseClass = 'editText'
    this.prop.Placeholder = 'Unidad a cotizar '
    this.prop.ControlSource = 'vi_cap_comecpy.med_cpy'
    this.prop.MaxLength = 64
    this.prop.Capture = true

    this.style.width = '80px'
  }
  async when() { // aqui me quede
    this.prop.ReadOnly = ! await this.Parent.whenVta()
    this.prop.Valid = true
    return !this.prop.ReadOnly
  }

}
