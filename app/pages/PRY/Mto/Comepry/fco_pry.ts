//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : fco_pry
// Description : Forma de cotización
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";

export class fco_pry extends CAPTURECOMPONENT {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = "Forma de cotizar";
    this.prop.Type = "text";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comepry.fco_pry";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      ["INSUMO POR INSUMO", "DESCRIPCION ", "Proyecto llave en mano"],
      ["I", "D", "P"],
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.Value = "I";
    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.inputStyle.width = "200px";
    this.style.width = "450px";
  }
}
