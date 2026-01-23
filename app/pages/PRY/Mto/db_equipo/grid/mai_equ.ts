//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : mai_equ
// Description : Nombre del equipo
// @author: El Fer Blocks
// Creation : 2023-06-29
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class mai_equ extends COLUMN {
  constructor() {
    super();
    this.prop.ColumnTextLabel = "Mail de envio "; // Column Header
    this.prop.Type = "text";
    this.prop.BaseClass = "textArea";
    this.prop.ControlSource = "vi_cap_db_equipo.mai_equ";
    this.prop.Placeholder = "Mails de envio separado por comas"
    this.prop.MaxLength = 32;
    this.prop.Capture = true;
    this.style.width = "350px";
  }

}
