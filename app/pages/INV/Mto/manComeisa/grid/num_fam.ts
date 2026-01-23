//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : num_fam
// Description : Numero de familia num_fam=0 es por clave de producto
// @author: El Fer Blocks
// Creation : 2023-06-29
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class num_fam extends COLUMN {
  constructor() {
    super();
    this.prop.ColumnTextLabel = "Número de familia"; // Column Header
    this.prop.Type = "number";
    this.prop.ControlSource = "vi_cap_comeisa.num_fam";
    this.prop.Capture = true;
    this.prop.updateKey = true;
    this.prop.ToolTipText = "Familia=0 es por clave de producto";
    this.prop.Min = "0";
    this.prop.Max = "2";
    this.style.width = "50px";
  }
}
