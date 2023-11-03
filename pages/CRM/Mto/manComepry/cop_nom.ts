//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : cop_nom
// Description : C=CLIENTE P=PROVEEDOR N=NO AFECTA
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class cop_nom extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Afectación";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comepry.cop_nom";
    this.prop.RowSourceType = 5;
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.RowSource = [
      ["Cliente", "Proveedor", "Interno"],
      ["C", "P", " "],
    ];
    this.prop.Capture = false;
    this.prop.ReadOnly = true;
    this.prop.updateKey = false;

  }

  //////////////////////////////////
  // event when
  ///////////////////////////////////

  async when() {
    this.prop.ReadOnly = true;
    return this.prop.ReadOnly;
  }

}
