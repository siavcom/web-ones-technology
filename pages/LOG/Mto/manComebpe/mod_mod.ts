//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : mod_mod
// Description : Modelo
// Author : El Fer Blocks
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class mod_mod extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Modelo";
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.ControlSource = "vi_cap_comebpe.mod_mod";
    this.prop.Capture = false;
    this.prop.updateKey = false;
    this.prop.ReadOnly = true;

    this.style.width = "256px";
    this.prop.Visible = false;
  }
}
