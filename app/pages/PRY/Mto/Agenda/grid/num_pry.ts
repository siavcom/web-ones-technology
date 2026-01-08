//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : num_pry
// Description : Numero
// Author : El Fer Blocks
// Creation : 2024-02-12
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class num_pry extends COLUMN {

  constructor() {
    super()
    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_agenda.num_pry'
    this.prop.Capture = true
    this.prop.updateKey = true
    this.prop.Disabled = true
    this.prop.Decimals = 0

    this.inputStyle.fontSize = "17px";
    this.inputStyle.fontWeight = "bold";
    this.style.width = "64px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
  }

}
