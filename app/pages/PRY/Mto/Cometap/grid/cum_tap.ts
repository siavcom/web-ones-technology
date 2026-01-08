//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : cum_tap
// Description : Costo unidad de medicion
// Author : El Fer Blocks
// Creation : 2023-10-26
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class cum_tap extends COLUMN {
  constructor() {
    super();
    this.prop.ColumnTextLabel = "Costo unidad de medición";
    this.prop.Type = "number";
    this.prop.Decimals = 5
    this.prop.Capture = true

    this.prop.ControlSource = "vi_cap_cometap.cum_tap";

    this.style.width = "64pxpx";
  }
}
