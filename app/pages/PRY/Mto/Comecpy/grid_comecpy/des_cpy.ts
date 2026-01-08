//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : des_cpy
// Description : DESCRIPCION DE LA PARTIDA
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";
export class des_cpy extends COLUMN {

  constructor() {
    super()

    this.prop.ColumnTextLabel = 'Descripción'
    this.prop.Type = 'textArea'
    this.prop.ControlSource = 'vi_cap_comecpy.des_cpy'
    this.prop.MaxLength = 1024
    this.prop.Capture = true

    this.style.width = "256px"
  }


  override async when() { // aqui me quede
    this.prop.ReadOnly = ! await this.Parent.whenVta()
    this.prop.Valid = true
    return !this.prop.ReadOnly
  }

  override async valid() {
    if (this.prop.Value.trim().length == 0) {
      return false
    }

    return true
  }

}
