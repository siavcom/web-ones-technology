//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : ord_tap
// Description : Consecutivo de la actividad
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class con_apy extends COLUMN {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.ColumnTextLabel = "Con."; // Column Header
    this.prop.Type = "number";
    this.prop.BaseClass = 'textLabel';// "editText";
    this.prop.ControlSource = "vi_cap_comeapy.con_apy";
    this.prop.Decimals = 0;
    this.prop.Capture = true;
    this.prop.updateKey = true;
    //this.prop.First=true
    this.prop.Disabled = true;
    // this.style.zIndex = 1;
    this.style.width = "28px";
  }
}
