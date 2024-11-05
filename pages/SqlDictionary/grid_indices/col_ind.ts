//////////////////////////////////////////////
// Clase : col_ind
// Descripcion : Columnas que se incluyen en el indice
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  05/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class col_ind extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.Order = 3;
    this.textLabel = "INCLUDED <COLUMNS>";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comeind.col_ind";
    this.prop.Placeholder = "INCLUDED (COLUMNS)";
    this.inputStyle.textTransform = "lowercase";
    this.style.width = "400px";
  }

  async valid() {
    this.prop.Value = this.prop.Value.toLowerCase();
    return super.valid();
  }
}
