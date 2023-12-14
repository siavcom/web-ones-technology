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

import { COMPONENT } from "@/classes/Component";

export class log_usu extends COMPONENT {
  constructor() {
    super();
    this.prop.Type = "text";
    this.prop.textLabel = "Login de usuario";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 3;
    this.prop.RowSource =
      "select nom_usu,log_usu from man_comeusu order by log_usu";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.style.zIndex = 3;

    this.prop.componentStyle.width = "400px";
  }
  async when() {
    this.Form.bt_aceptar.prop.Visible = true;
    this.Form.Grid.prop.RecordSource = "";
    return true;
  }
}
