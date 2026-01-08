//////////////////////////////////////////////
// BaseClass : component
// Class : cli_pry
// Description : Datos Json cuando es un cliente nuevo
// Author : El Fer Blocks
// Creation : 2024-12-13
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class cli_pry extends COMPONENT {
  constructor() {
    super();
    this.prop.Type = "json";
    this.prop.ControlSource = "vi_cap_comepry.cli_pry";
    this.prop.Capture = true;
    this.style.width = "99%";
    this.inputStyle.width = "min-content";
    this.inputStyle.display = 'flex';
    this.inputStyle.flexWrap = 'wrap';
    this.prop.ReadOnly = true
    this.prop.Disabled = true

  }
}
