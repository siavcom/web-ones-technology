//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : alm_tda
// Description : Insumos por almacen
// Author : El Fer Blocks
// Creation : 2023-12-28
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class alm_tda extends COMPONENT {
  constructor() {
    super();
    this.prop.Type = "text";
    this.prop.textLabel = "Almacen";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 3;
    this.prop.RowSource =
      "select des_tda,alm_tda from man_cometda order by des_tda";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "350px,125px";
    this.prop.componentStyle.width = "250px";
    this.style.width = "400px";
  }
  async when() {
    this.Form.bt_aceptar.prop.Visible = true;
    this.Form.Grid.prop.RecordSource = "";
    return true;
  }
}
