//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : ord_tap
// Description : Orden de la actividad
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class ord_tap extends COLUMN {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.ColumnTextLabel = "Orden"; // Column Header
    this.prop.Type = "number";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_cometap.ord_tap";
    this.prop.Placeholder = "Orden de la actividad";
    this.prop.ColumnCount = 2;
    this.prop.Min = "0";
    this.prop.Max = "99";
    this.prop.Decimals = 0;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.style.width = "28px";

  }
}