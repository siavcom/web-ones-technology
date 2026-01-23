//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : amu_tap
// Description : Actividad multiple
// @author: El Fer Blocks
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class amu_tap extends COLUMN {
  constructor() {
    super();

    this.prop.ColumnTextLabel = "Actividad multiple"; // Column Header
    this.prop.Type = "checkBox";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_cometap.amu_tap";
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.style.width = "54px";
    // this.style.zIndex = 1;
  }
}
