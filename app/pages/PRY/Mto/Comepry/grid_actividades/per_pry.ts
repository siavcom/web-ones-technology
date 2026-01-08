//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : per_pry
// Description : Periodicidad
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'


export class per_pry extends COLUMN {
  constructor() {
    super();

    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comeapy.per_pry";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      ["Unico", "Mensual", "Semestral", "Anual", "Semanal"],
      ["U", "M", "S", "A", "W"],
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%";
    this.prop.Capture = false;
    this.prop.updateKey = false;
    this.prop.Disabled = true
    this.inputStyle.width = "100px";
    this.style.width = "64px";
  }
  async interactiveChange() {
    if (this.prop.Value != "U") this.Form.per_apy.prop.Visible = true;
    else {
      this.Form.per_apy.prop.Visible = false;
      this.Form.per_apy.prop.Value = 1;
    }
  }
}
