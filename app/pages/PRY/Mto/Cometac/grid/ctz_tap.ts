//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : ctz_tap
// Description : Es cotizacion
// @author: El Fer Blocks
// Creation : 2024-08-12
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class ctz_tap extends COLUMN {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.ColumnTextLabel = "Cotización"; // Column Header
    this.prop.Caption = 'Si='
    this.prop.Type = "checkBox";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_cometac.ctz_tap";
    this.prop.ToolTipText = "Si es cotizacion";
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.style.width = "auto";
    this.inputStyle.width = 'auto'
  }
}
