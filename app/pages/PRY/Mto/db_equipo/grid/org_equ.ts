//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : nom_equ
// Description : Nombre del equipo
// Author : El Fer Blocks
// Creation : 2023-10-30
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class org_equ extends COLUMN {
  constructor() {
    super();
    this.prop.ColumnTextLabel = "Organigrama"; // Column Header
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_db_equipo.org_equ";
    this.prop.MaxLength = 128;
    this.prop.Capture = true;
    this.prop.Placeholder = "Estructura en el organigrama"; // Column Header

    this.style.width = "300px";
  }
}
