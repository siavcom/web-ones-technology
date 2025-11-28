//////////////////////////////////////////////
// Clase : sis_sis
// Descripcion : Sistema a cual pertenece el programa
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  07/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class sis_prg extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.Order = 1;
    this.prop.ColumnTextLabel = "VFP Sistema  ";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_prg.sis_prg";

    this.style.width = "40px";
  }
}
