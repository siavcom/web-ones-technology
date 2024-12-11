//////////////////////////////////////////////
// Clase : whe_ind
// Descripcion : Expresion del indice campo
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  05/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class whe_ind extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.Order = 3;
    this.textLabel = "Where del indice";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comeind.whe_ind";
    this.prop.Placeholder = "Where <field> =,>,<,... <value>";
    this.inputStyle.textTransform = "lowercase";
    this.style.width = "256px";
  }

  async valid() {
    this.prop.Value = this.prop.Value.toLowerCase();
    return await super.valid();
  }
}
