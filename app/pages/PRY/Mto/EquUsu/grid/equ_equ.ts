//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : equ_equ
// Description : Nombre del equipo
// @author: El Fer Blocks
// Creation : 2023-06-29
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class equ_equ extends COLUMN {
  constructor() {
    super();
    this.prop.ColumnTextLabel = "Equipo"; // Column Header
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_db_equusu.equ_equ";
    this.prop.RowSourceType = 4;
    this.prop.RowSource =
      "select des_equ,equ_equ from now.equipos order by equ_equ";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    // this.style.zIndex = 3;
    this.prop.Capture = true;
    this.prop.updateKey = true;
    this.style.width = "300px";
  }
}
