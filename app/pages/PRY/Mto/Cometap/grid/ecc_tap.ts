//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : ecc_tap
// Description : Equipo de control de calidad
// Author : El Fer Blocks
// Creation : 2023-10-26
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class ecc_tap extends COLUMN {
  constructor() {
    super();
    this.prop.ColumnTextLabel = "Control de calidad";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_cometap.ecc_tap";

    this.prop.RowSourceType = 4;
    this.prop.RowSource =
      "select des_equ,equ_equ from now.equipos order by des_equ";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;

    this.prop.ColumnWidths = "200px,100px";
    this.style.width = "220px";
  }
}
