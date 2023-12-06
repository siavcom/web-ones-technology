//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : amu_tap
// Description : Actividad multiple
// Author : El Fer Blocks
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

    this.textLabel = "Actividad multiple"; // Column Header
    this.prop.Type = "checkBox";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_cometap.amu_tap";
    this.prop.MaxLength = 1;
    this.prop.Decimals = 0;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.style.zIndex = 1;
  }
}
