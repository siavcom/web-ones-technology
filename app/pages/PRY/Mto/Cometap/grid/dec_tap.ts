//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : dec_tap
// Description : Descripción completa
// @author: El Fer Blocks
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class dec_tap extends COLUMN {
  constructor() {
    super();
    this.prop.ColumnTextLabel = "Descripción completa"; // Column Header
    this.prop.Type = "textarea";
    this.prop.BaseClass = "text";
    this.prop.ControlSource = "vi_cap_cometap.dec_tap";
    this.prop.Placeholder = "Descripción completa de la actividad";
    this.prop.MaxLength = 128;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    // this.style.zIndex = 1;

    this.style.width = "300px";
  }
}
