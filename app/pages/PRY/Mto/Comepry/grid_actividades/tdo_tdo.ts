//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : tdo_tdo
// Description : Documento generado
// @author: El Fer Blocks
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class tdo_tdo extends COLUMN {
  constructor() {
    super();

    this.prop.ColumnTextLabel = "Documento generado "; // Column Header
    this.prop.Type = "text";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSource = "cometdo.des_tdo,tdo_tdo";

    this.prop.RowSourceType = 2; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.ControlSource = "vi_cap_comeapy.tdo_tdo";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "80%,20%";
    this.prop.Disabled = true
    this.prop.Capture = true
    this.prop.Valid = true
    this.style.width = "112px";
  }

}
