//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : fpr_apy
// Description : Fecha de programacion
// Author : El Fer Blocks
// Creation : 2024-02-12
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class fpr_apy extends COLUMN {

  constructor() {
    super()

    this.prop.ColumnTextLabel = "Fecha programada"; // Column Header
    this.prop.Type = "datetime";
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_agenda.fpr_apy'
    this.style.width = "164px";
  }
  async valid() {
    if (this.value < this.Form.mPublic.fpo_pge) return false
    return true
  }

}
