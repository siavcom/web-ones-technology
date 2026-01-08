//////////////////////////////////////////////
// Clase : aut_apy
// Descripcion : Actividad autorizada
// Obs:
// Author : Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  23/Enero/2023
/////////////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class aut_apy extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.Order = 1;
    this.prop.ColumnTextLabel = "Autorizada";
    this.prop.BaseClass = "editText";
    this.prop.Type = "checkBox";
    this.prop.ControlSource = "vi_cap_agenda.aut_apy";
    this.prop.Placeholder = "1=SI, 0=No ";
    this.style.width = "20px";
    //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
    //      this.prop.Autofocus=true
  }
  async when() {

    if (this.Form.mPublic.log_usu == 'sa' ||
      this.Form.mPublic.log_usu == this.Parent.eqa_tap.prop.Value) {
      this.prop.ReadOnly = true
    } else {
      this.prop.ReadOnly = false
    }
    return !this.prop.ReadOnly

  }

}
