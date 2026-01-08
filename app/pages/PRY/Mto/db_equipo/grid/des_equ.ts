//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : nom_equ
// Description : Descripcion del equipo
// Author : El Fer Blocks
// Creation : 2023-10-30
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class des_equ extends COLUMN {
  constructor() {
    super();
    this.prop.ColumnTextLabel = "Descripción del equipo";
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_db_equipo.des_equ";
    this.prop.MaxLength = 64;
    this.prop.Capture = true;
    this.style.width = "300px";
  }
}
