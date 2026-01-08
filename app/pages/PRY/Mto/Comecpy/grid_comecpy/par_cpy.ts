//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : par_cpy
// Description : PARTIDA DE LA COTIZACION
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'
export class par_cpy extends COLUMN {

  constructor() {
    super()

    this.prop.ColumnTextLabel = 'No. Partida'
    this.prop.Type = 'number'
    this.prop.ControlSource = 'vi_cap_comecpy.par_cpy'
    this.prop.MaxLength = 4
    this.prop.Min = "0"
    this.prop.Max = "9999"
    this.prop.Decimals = 0
    this.prop.Capture = true
    this.style.width = "48px";
  }

  override async when() {
    this.prop.ReadOnly = ! await this.Parent.whenVta()
    this.prop.Valid = true
    return !this.prop.ReadOnly
  }

}
