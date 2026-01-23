//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : can_cpy
// Description : DESCRIPCION DE LA PARTIDA
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";
export class can_cpy extends COLUMN {

  constructor() {
    super()

    this.prop.ColumnTextLabel = 'Cantidad a cotizar'
    this.prop.Type = "number";
    this.prop.ControlSource = 'vi_cap_comecpy.can_cpy'
    this.prop.Decimals = 2
    this.prop.MaxLength = 12
    this.prop.Min = '0.01'
    this.prop.Max = '999999999.99'
    this.prop.Capture = true
    this.style.width = '98px'

  }
  override async when() {
    this.prop.ReadOnly = ! await this.Parent.whenVta()
    this.prop.Valid = true

    return !this.prop.ReadOnly
  }

}
