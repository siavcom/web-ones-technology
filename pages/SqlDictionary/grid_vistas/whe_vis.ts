//////////////////////////////////////////////
// Clase : whe_vis
// Descripcion : Condicion where en el servidor de SQL de la vista
// Author : Fernando Cuadras Angulo
// Creacion : febrero/2024
// Ult.Mod  14/Febrero /2024
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class whe_vis extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.Order = 3;
    this.prop.ColumnTextLabel = "SQL Server Where";
    this.prop.BaseClass = "editText";
    this.prop.Type = "textArea";
    this.prop.ControlSource = "vi_cap_comevis.whe_vis";
    this.prop.ToolTipText = "SQL Server Where"
    this.prop.Placeholder = "only where condition (without where =) ";
    this.style.width = "300px";
  }
}
