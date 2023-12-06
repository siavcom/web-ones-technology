//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : fce_apy
// Description : Descripción
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class fce_apy extends COLUMN {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.textLabel = "Fecha de cambio de estatus"; // Column Header
    this.prop.Type = "date";
    this.prop.ControlSource = "vi_cap_comeapy.fce_apy";
    this.prop.ReadOnly = true;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.style.width = "140px";
  }

  //////////////////////////////////
  // event when
  ///////////////////////////////////

  async when() {
    this.prop.ReadOnly = true;
    return false;
  }
}
