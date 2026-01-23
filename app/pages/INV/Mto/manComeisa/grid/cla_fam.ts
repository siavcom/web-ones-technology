//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : cla_fam
// Description : Calve de famila
// @author: El Fer Blocks
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
    this.prop.ColumnTextLabel = "Clave de familia"; // Column Header
    this.prop.ControlSource = "vi_cap_comeisa.cla_fam";
    this.prop.Capture = true;
    this.prop.Min = 0;
    this.style.width = "100px";
  }
  async when() {
    if (this.Parent.num_fam.prop.Value == 0) {
      this.prop.ReadOnly = true;
      this.prop.Valid = true;
      return false;
    }
    this.prop.ReadOnly = false;
    this.prop.Valid = false;
    return true;

  }
}
