//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : cop_nom
// Description : C=CLIENTE P=PROVEEDOR N=NO AFECTA
// @author: El Fer Blocks
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

    this.prop.Caption = "Afectación";
    this.prop.BaseClass = 'textLabel' //comboBox";
    this.prop.ControlSource = "vi_cap_comepry.cop_nom";
    this.prop.RowSourceType = 5;
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.RowSource = [
      ["Cliente", "Proveedor", "Interno"],
      ["C", "P", " "],
    ];
    this.prop.Value = 'C'
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.inputStyle.width = "200px";
    this.style.width = "450px";
  }
  /*
    //////////////////////////////////
    // event when
    ///////////////////////////////////
  
    async when() {
      this.prop.ReadOnly = true;
      return this.prop.ReadOnly;
    }
    */
}

