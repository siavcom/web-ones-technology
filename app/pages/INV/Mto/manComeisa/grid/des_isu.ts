//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : des_isu
// Description : Descripcion del insumo
// @author: El Fer Blocks
// Creation : 2023-06-29
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class des_isu extends COLUMN {
  constructor() {
    super();
    this.prop.ColumnTextLabel = "Descripción"; // Column Header
    this.prop.BaseClass = "Caption";
    this.prop.ControlSource = "vi_cap_comeisa.des_isu";
    this.prop.Capture = false;
    this.prop.ReadOnly = true;
  }
}
