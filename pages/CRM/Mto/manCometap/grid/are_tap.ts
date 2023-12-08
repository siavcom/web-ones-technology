//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : are_tap
// Description : Actividad en caso de reporgramar
// Author : El Fer Blocks
// Creation : 2023-12-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class are_tap extends COLUMN {
  constructor() {
    super();
    this.textLabel = "Reprogramación"; // Column Header
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_cometap.are_tap";
    this.prop.RowSourceType = 4;
    this.prop.RowSource =
      "select des_tap,tap_tap,ord_tap from Now.vi_cap_cometap union select '..No hay....' as des_tap,'...' as tap_tap,0 as ord_tap order by ord_tap";

    this.prop.ColumnCount = 3;
    this.prop.BoundColumn = 2;
    this.prop.Capture = true;
    this.prop.ColumnWidths = "230px,60px,20px";
    this.style.width = "310px";
  }
}
