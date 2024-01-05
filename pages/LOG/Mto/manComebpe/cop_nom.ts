//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : cop_nom
// Description : C=Cliente , P=Proveedor
// Author : El Fer Blocks
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from "@/classes/captureComponent";

export class cop_nom extends captureComponent {
  constructor() {
    super();

    this.prop.Type = "text";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comebpe.cop_nom";
    this.prop.RowSourceType = 5;
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.RowSource = [
      ["Cliente", "Proveedor"],
      ["C", "P"],
    ];

    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.prop.ReadOnly = true;
    this.prop.Visible = false;
  }
  //////////////////////////////////
  // event when
  ///////////////////////////////////

  async when() {
    if (this.Form.tip_bpe.prop.Value == 0) {
      this.prop.ReadOnly = false;
    } else {
      this.prop.ReadOnly = true;
    }

    this.prop.Valid = true;
    return !this.prop.ReadOnly;
  }

  //////////////////////////////////
  // event click
  ///////////////////////////////////
  /*
    async click() {

    }
    */

  //////////////////////////
  // KeyPress
  // Descripcion: Cada tecla que se presiona en el input
  //////////////////////////
  /*
    public keyPress = async ($event) => {
    const key=super.keyPress($event)

   }
  */
}
