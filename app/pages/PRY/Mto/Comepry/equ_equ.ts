//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : equ_usu
// Description : equipo de trabajo
// Author : El Fer Blocks
// Creation : 2023-10-26
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";

export class equ_equ extends CAPTURECOMPONENT {
  constructor() {
    super();
    this.prop.Type = "text";
    this.prop.Caption = "Equipo de trabajo";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comepry.equ_equ";
    this.prop.RowSourceType = 4;
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.Capture = true;
    this.inputStyle.width = "256px";
    this.style.width = "450px";
  }

  override  async valid() {
    await this.Form.log_usu.when()
    return true
  }
}