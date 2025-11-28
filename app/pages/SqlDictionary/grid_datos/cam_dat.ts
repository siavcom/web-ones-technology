//////////////////////////////////////////////
// Clase : des_dat
// Descripcion : Nombre del campo
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class cam_dat extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.Order = 2;
    this.prop.ColumnTextLabel = "Campo";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comedat.cam_dat";
    this.prop.Placeholder = "Nombre del campo";
    this.prop.ToolTipText = "Nombre del campo";
    this.inputStyle.textTransform = "lowercase";
    //this.prop.First=true;
    this.prop.Value = "";
    this.style.width = "100px";
    this.prop.ErrorMessage = "Campo existente o valor no permitido";
  }

  //////////////////////////////////
  // Evento When
  ///////////////////////////////////
  async when() {

    this.prop.Valid = true
    const Value = this.prop.Value.trim().toUpperCase();
    if (
      Value == "USU_USU" ||
      Value == "USU_CRE" ||
      Value == "TIE_UAC" ||
      Value == "TIE_CRE" ||
      Value == "TIMESTAMP" ||
      Value == "KEY_PRI"
    ) {
      this.prop.ReadOnly = true;

    }
    else
      this.prop.ReadOnly = false;

    return !this.prop.ReadOnly
  }

  override async valid() {
    if (!this.prop.When) return true;
    if (this.prop.Value.trim().length == 0) return false;

    this.prop.Value = this.prop.Value.toLowerCase();
    const valor = this.prop.Value.trim();
    const recno = this.Recno;
    const data = await this.Form.db.localSql(
      `select count(key_pri) as existe from vi_cap_comedat where trim(lower(cam_dat))="${valor}" and recno<>${recno}`
    );
    if (data[0].existe > 0) {
      this.prop.Value = "";
      return false;
    }
    return true;
  }
}
