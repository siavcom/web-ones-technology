//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : eco_tpy
// Description : equipo de trabajo
// Author : El Fer Blocks
// Creation : 2023-10-26
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";
export class eco_tpy extends COLUMN {
  constructor() {
    super();
    this.prop.Type = "text";
    this.prop.ColumnTextLabel = "Equipo de compras";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_man_cometpy.eco_tpy";
    this.prop.RowSource = `select des_equ,equ_equ from vi_cap_equipo order by equ_equ`;
    this.prop.RowSourceType = 0
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    // this.style.zIndex = 3;
    this.prop.Capture = true;
    this.prop.updateKey = false;
    //this.inputStyle.width = "256px";
    this.prop.ColumnWidths = "124px,94px";
    this.style.width = "200px";
  }

}
