//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : des_tpy
// Description : DESCRIPCION
// Author : El Fer Blocks
// Creation : 2023-06-29
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class des_tpy extends COLUMN {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.ColumnTextLabel = "Descripcion"; // Column Header
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_man_cometpy.des_tpy";
    this.prop.ToolTipText = "Descripcion del proyecto";
    this.prop.MaxLength = 128;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    // this.style.zIndex = 1
    this.style.width = "300px";
  }
}
