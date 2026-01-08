//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : log_usu
// Description : usuario que mantiene el proyecto
// Author : El Fer Blocks
// Creation : 2023-10-26
// Update Date  : 15/Feb/2024
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";

export class log_usu extends CAPTURECOMPONENT {
  constructor() {
    super();
    this.prop.Type = "text";
    this.prop.Caption = "Usuario";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comepry.log_usu";
    this.prop.RowSourceType = 4;
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.Capture = true;
    this.inputStyle.width = "256px";
    this.style.width = "450px";
  }

  override async when() {

    const equ_equ = this.Form.equ_equ.prop.Value.trim()
    const ins_sql = `select nom_usu,log_usu from now.equusu where rtrim(equ_equ)='${equ_equ}' group by log_usu,nom_usu`
    this.prop.RowSource = ins_sql

    //    this.Form.log_usu.prop.RowSourceType = 4;
    return true
  }
}
