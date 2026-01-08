//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : tpy_tpy
// Description : TIPO DE PROYECTO
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class tpy_tpy extends COMPONENT {
  constructor() {
    super();
    this.prop.Caption = "Tipo de proyecto";
    this.prop.BaseClass = "comboBox";
    //        this.prop.ControlSource = 'vi_cap_cometpy.tpy_tpy'
    this.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource =
      "select vi_cap_cometpy.des_tpy,tpy_tpy from vi_cap_cometpy";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "80%,20%";
    this.prop.Capture = false;
    this.prop.updateKey = true;
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
    this.style.width = "500px";
    this.inputStyle.width = "350px";
  }
  async when() {
    this.Form.Grid.prop.RecordSource = "";
    this.Form.bt_aceptar.prop.Visible = true;
    return true;
  }


  override async interactiveChange(): Promise<void> {
    this.Form.bt_aceptar.prop.Visible = true;
    this.Form.Grid.prop.RecordSource = "";
    this.Form.Grid.prop.Visible = false;
  }
}
