//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : per_apy
// Description : Numero actividad periodo
// Author : El Fer Blocks
// Creation : 2023-12-05
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class per_apy extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Periodo número ";
    this.prop.Type = "spinner";
    this.prop.Type = "number";
    this.prop.Value = 1;
    this.prop.MaxLength = 3;
    this.prop.Min = "1";
    this.prop.Max = "999";
    this.prop.Visible = false;
    this.style.width = "100px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";

    this.prop.componentStyle.width = "100px";
    this.prop.componentStyle.fontSize = "17px";
    this.prop.componentStyle.fontWeight = "bold";
  }

  async when() {
    if (this.Form.per_pry.prop.Value == "U") this.prop.ReadOnly = true;
    else this.prop.ReadOnly = false;

    return !this.prop.ReadOnly;
  }
}
