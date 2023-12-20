/////////////////////////////////////////////
// Clase : header_report
// Descripcion : Header de la columna
// Author : Fernando Cuadras Angulo
// Creacion : Octubre/2023
// Ult.Mod  16/Octubre/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class header_report extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.textLabel = "Header/Title";
    this.prop.ControlSource = "vi_cap_db_reportfields.header_report";

    this.style.width = "400px";
    //this.style.zIndex=2
  }
}
