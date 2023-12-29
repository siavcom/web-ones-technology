//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : cla_fam
// Description : Calve de famila
// Author : El Fer Blocks
// Creation : 2023-06-29
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class cla_fam extends COLUMN {
  constructor() {
    super();
    this.textLabel = "Clave de familia"; // Column Header
    this.prop.ControlSource = "vi_cap_comeisa.cla_fam";
    this.prop.Capture = true;
    this.prop.Min = 0;
    this.style.width = "100px";
  }
  async when() {
    if (this.Parent.num_fam.prop.Value == 0) {
      this.prop.ReadOnly = true;
      return false;
    } else {
      this.prop.ReadOnly = false;
      return true;
    }
  }
}
