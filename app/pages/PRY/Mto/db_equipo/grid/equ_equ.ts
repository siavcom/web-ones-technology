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
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_db_equipo.equ_equ";
    this.prop.Placeholder = "Nombre corto sin espacios"
    this.prop.MaxLength = 32;
    this.prop.Capture = true;
    this.prop.updateKey = true;

    this.style.width = "350px";
  }
  override async when() {
    const Value = this.prop.Value.trim();
    const res = await this.Sql.localAlaSql(
      `select key_pri from vi_cap_db_equipo where equ_equ='${Value}'`
    );

    if (res.length > 0 && res[0].key_pri > 0)
      this.prop.ReadOnly = true;
    else this.prop.ReadOnly = false;
    return !this.prop.ReadOnly;
  }
  override async valid() {
    this.prop.Value.replaceAll(' ', '')
    return true
  }

}
