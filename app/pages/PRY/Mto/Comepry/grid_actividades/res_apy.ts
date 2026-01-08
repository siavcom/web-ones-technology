//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : res_apy
// Description : Descripción
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class res_apy extends COLUMN {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.ColumnTextLabel = "Resultado"; // Column Header
    this.prop.Type = "text";
    this.prop.BaseClass = "textArea";
    this.prop.ControlSource = "vi_cap_comeapy.res_apy";
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.style.width = "200px";
  }
  async when() {
    this.prop.ReadOnly = this.Parent.tap_tap.when();
    return !this.prop.ReadOnly;
  }
}
