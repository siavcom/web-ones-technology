//////////////////////////////////////////////
// Clase : nom_tab
// Descripcion : Nombre de la tabla
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  07/Septiembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class nom_tab extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.Order = 1;
    this.textLabel = "Nombre";
    this.prop.BaseClass = "editText";
    this.prop.ToolTipText = "Nombre de la tabla";
    this.prop.ControlSource = "vi_cap_cometab.nom_tab";
    this.prop.componentStyle.textTransform = "lowercase";
    this.prop.Placeholder = "SQL table name";
    this.style.width = "150px"; /* width/height  - initial value: auto */
  }
}
