//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : est_tap
// Description : Tipos de estatus
// @author: El Fer Blocks
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class est_tap extends COLUMN {
  constructor() {
    super();
    this.prop.ColumnTextLabel = "Tipos de estatus"; // Column Header
    this.prop.Type = "text";
    this.prop.BaseClass = "textArea";
    this.prop.ControlSource = "vi_cap_cometap.est_tap";
    this.prop.Placeholder = "Tipos de estatus";
    this.prop.MaxLength = 128;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.inputStyle.width = "250px";
    this.style.width = "250px";

  }
}
