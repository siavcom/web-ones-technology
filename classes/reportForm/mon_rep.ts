//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : mco_pry
// Description : Moneda
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class mon_rep extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Moneda";
    this.prop.BaseClass = "comboBox";
    //        this.prop.ControlSource = 'vi_cap_comepry.mco_pry'
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ToolTipText = "Moneda en la cual presentara el reporte";
    this.prop.Capture = false;
    this.prop.updateKey = false;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.style.width = "250px";
    //  this.prop.TabIndex=101
    //this.style.zIndex=1
  }

  public async init() {
    const m = this.Form.publicVar;
    const des_mon = [
      "Todas",
      m.pr1_pge,
      m.pr2_pge,
      m.pr3_pge,
      m.pr4_pge,
      m.pr5_pge,
    ];
    const num_mon = [0, 1, 2, 3, 4, 5];
    this.prop.RowSource = [des_mon, num_mon];
    this.prop.Value = 0;
  }
}
