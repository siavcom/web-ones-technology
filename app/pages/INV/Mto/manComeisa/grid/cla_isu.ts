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

export class cla_isu extends COLUMN {
  constructor() {
    super();
    this.prop.ColumnTextLabel = "Clave del insumo"; // Column Header
    this.prop.ControlSource = "vi_cap_comeisa.cla_isu";
    this.prop.Capture = true;
    this.prop.updateKey = true;
    this.style.width = "300px";
  }
  async when() {
    if (this.Parent.num_fam.prop.Value > 0) {
      this.prop.ReadOnly = true;
      this.prop.Valid = true;
      return false;
    }
    this.prop.ReadOnly = false;
    this.prop.Valid = false;
    return true;

  }
  /**
   * Validates the value of the `prop` property.
   *
   * @return {boolean} Returns `true` if the value is valid, otherwise `false`.
   */
  async valid() {
    this.prop.Value = this.prop.Value.toUpperCase();
    if (this.Parent.num_fam.prop.Value > 0) {
      this.prop.Valid = true;
      return true;
    }
    //const m = { cla_isu: this.prop.Value };
    const res = await SQLExec(
      `select key_pri,des_isu from man_comeisu where cla_isu='${this.prop.Value}'`
    );
    if (res.length > 0 && res[0].key_pri > 0) {
      this.Parent.des_isu.prop.Value = res[0].des_isu;
      this.prop.Valid = true;
      return true;
    } else {
      this.Parent.des_isu.prop.Value = "";
      this.prop.Valid = false;
      return false;
    }
  }
}
