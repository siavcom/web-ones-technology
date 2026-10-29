//////////////////////////////////////////////
// Clase : des_dat
// Descripcion : Nombre del campo
// @author: Fernando Cuadras Angulo
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
    //  this.prop.Order = 2;
    this.prop.ColumnTextLabel = "Campo";
    //   this.prop.BaseClass = "editText";
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

    this.old_value = this.prop.Value
    return !this.prop.ReadOnly
  }

  override async valid() {
    if (!this.prop.When) return true;
    if (this.prop.Value.trim().length == 0) return false;

    const cam_dat = this.prop.Value.toLowerCase().replaceAll(' ', '');

    const valor = await currentValue('recno', 'vi_cap_comedat')
    const recno = valor.recno;

    const data = await localSql(
      `select count(key_pri) as existe from vi_cap_comedat where trim(lower(cam_dat))="${cam_dat}" and recno<>${recno}`
    );
    if (data[0].existe > 0) {
      this.prop.Value = this.old_value;
      //await nextTick()
      return false;
    }
    this.prop.Value = cam_dat
    return true;
  }
}
