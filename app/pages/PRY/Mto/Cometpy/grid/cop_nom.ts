//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : cop_nom
// Description : CLIENTE/PROVEEDOR
// Author : El Fer Blocks
// Creation : 2023-06-29
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class cop_nom extends COLUMN {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.ColumnTextLabel = "Cliente/Proveedor"; // Column Header
    this.prop.Type = "text";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_man_cometpy.cop_nom";
    this.prop.Capture = true;
    this.prop.RowSource = [
      ["Clientes", "Proveedores", "Interno"],
      ["C", "P", "I"],
    ]; //
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 3-Select SQL 5-Array
    this.prop.ColumnCount = 2; // Columns number
    this.prop.BoundColumn = 2; // the result is bound to column number 2
    // this.style.zIndex = 1
    this.style.width = "100px";
  }
}
