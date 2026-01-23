//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : des_tap
// Description : DESCRIPCION
// @author: El Fer Blocks
// Creation : 2023-06-29
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class des_tap extends COLUMN {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.ColumnTextLabel = "Descripcion"; // Column Header
    this.prop.ControlSource = "vi_cap_cometac.des_tap";
    this.prop.ToolTipText = "Descripcion del proyecto";
    this.prop.MaxLength = 128;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    // this.style.zIndex = 1
    this.style.width = "300px";
  }
}
/*

*/