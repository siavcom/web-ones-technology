//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : des_tap
// Description : fecha de conclusion
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class fco_apy extends COLUMN {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.ColumnTextLabel = "Concluye";
    this.prop.Type = "date";
    this.prop.ControlSource = "vi_cap_comeapy.fco_apy";
    this.prop.Placeholder = "Descripción";

    this.prop.Capture = true;
    this.prop.updateKey = false;
    // this.style.zIndex = 1;
    this.style.width = "116px";
  }
}
