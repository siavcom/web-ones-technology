//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : fec_cpy
// Description : Fecha de cotizacion
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";
export class fec_cpy extends COLUMN {

  constructor() {
    super()

    this.prop.ColumnTextLabel = 'Fecha de cotizacion '
    this.prop.Type = 'date'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.fec_cpy'
    this.prop.Capture = false
    this.prop.Enabled = false
    this.style.width = "max-content"

  }
  override async when() {
    this.prop.ReadOnly = ! await this.Parent.whenVta()
    this.prop.Valid = true
    return !this.prop.ReadOnly
  }

}
