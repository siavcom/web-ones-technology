//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : des_tap
// Description : Descripción
// Author : El Fer Blocks
// Creation : 2023-11-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class des_tap extends COLUMN {
  /**
   * Creates an instance of des_tap.
   * @memberof des_tap
   */
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.textLabel = "Descripción"; // Column Header
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comeapy.des_tap";
    this.prop.Placeholder = "Descripción";
    this.prop.MaxLength = 128;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.style.zIndex = 1;
    this.prop.componentStyle.width = "250px";
    this.style.width = "250px";
  }
}