//////////////////////////////////////////////
// BaseClass : component
// Class : tip_for
// Description : Tipo de formula
// Author : MGSR
// Creation : 2025/02/07
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class tip_for extends COMPONENT {
  constructor() {
    super();

    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.Caption = 'Tipo de formula';
    this.prop.RowSource = [
      [
        "(cst_isu*val_mon)*(1+(fic_alm/100))",
        "(cos_cap/can_mov)*(1+(fic_alm/100))",
        "prr_pro*(1+(fic_alm/100))",
        "Nueva"
      ],
      ["CS", "CP", "CR", "OT"]
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.inputStyle.width = "300px";
    //this.style.width = "auto";
    this.prop.Value = "CS";
  }
  async interactiveChange() {
    if (this.prop.Value == "OT") {
      this.Parent.for_cal.prop.Visible = true
      this.Parent.for_cal.prop.Disabled = false
      this.Parent.for_cal.prop.Value = "cst_isu*val_mon"
      return true;
    }

    else {
      this.Parent.for_cal.prop.Visible = false
      this.Parent.for_cal.prop.Disabled = true

      return true;

    }
    return true;
  }
}
