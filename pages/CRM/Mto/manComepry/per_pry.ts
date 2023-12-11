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

import { captureComponent } from "@/classes/captureComponent";

export class per_pry extends captureComponent {
  constructor() {
    super();
    this.prop.textLabel = "Periodicidad";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comepry.per_pry";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      ["Unico", "Mensual", "Semestral", "Anual", "Semanal"],
      ["U", "M", "S", "A", "W"],
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%";
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.style.zIndex = 2;
  }
  async interactiveChange() {
    if (this.prop.Value != "U") this.Form.per_apy.prop.Visible = true;
    else {
      this.Form.per_apy.prop.Visible = false;
      this.Form.per_apy.prop.Value = 1;
    }
  }
}
