//////////////////////////////////////////////
// Clase : maxLen
// Descripcion : Valor max p longitud
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class maxLen extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.Order = 3;
    this.textLabel = "Valor max/logitud";
    this.prop.BaseClass = "editText";
    this.prop.Type = "text";
    this.prop.ControlSource = "vi_cap_for.maxlen";
    this.prop.ToolTipText = "Valor max/Longitud del campo";
    this.prop.Placeholder = "Valor max/Longitud del campo";
    this.prop.Value = "";

    //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
    this.style.width = "100px";
  }
}
