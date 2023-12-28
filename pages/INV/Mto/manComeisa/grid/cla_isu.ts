//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : equ_equ
// Description : Nombre del equipo
// Author : El Fer Blocks
// Creation : 2023-06-29
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class cla_isu extends COLUMN {
  constructor() {
    super();
    this.textLabel = "Insumo"; // Column Header
    this.prop.ControlSource = "vi_cap_comeisa.cla_isu";
    this.prop.Capture = true;
    this.prop.updateKey = true;
    this.style.width = "300px";
  }
}
