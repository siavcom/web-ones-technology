//////////////////////////////////////////////
// Clase : prg_prg
// Descripcion : NOMBRE Y UBICACION DEL PROGRAMA
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  :5/Octubre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class prg_prg extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.Order = 3;
    this.prop.ColumnTextLabel = "VFP Path  ";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_prg.prg_prg";
    this.prop.ToolTipText = "Path y programa VFP";
    this.prop.Placeholder = "Programa VFP";
    this.style.width = "128px";
  }
}
