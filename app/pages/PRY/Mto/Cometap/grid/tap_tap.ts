//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : tap_tap
// Description : Tipo de actividad
// Author : El Fer Blocks
// Creation : 2024-02-21
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class tap_tap extends COLUMN {
  constructor() {
    super();

    this.prop.ColumnTextLabel = "Actividad"; // Column Header
    this.prop.Type = "text";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_cometap.tap_tap";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;

    this.prop.Capture = true;
    this.prop.updateKey = true;
    this.prop.RowSource = ""; //
    this.inputStyle.width = "-moz-available";
    this.style.width = "200px";

  }
}
