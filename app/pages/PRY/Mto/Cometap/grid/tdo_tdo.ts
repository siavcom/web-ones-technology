//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : tdo_tdo
// Description : Documento a generar
// Author : El Fer Blocks
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

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.ColumnTextLabel = "Documento a generar "; // Column Header

    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_cometap.tdo_tdo";

    this.prop.RowSourceType = 4;
    this.prop.RowSource =
      "select des_tdo,tdo_tdo from now.cometdo order by des_tdo";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;

    this.prop.ColumnWidths = "200px,60px";
    this.inputStyle.width = "-moz-available";
    this.style.width = "220px";
  }
}
