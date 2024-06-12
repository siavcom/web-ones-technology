//////////////////////////////////////////////
// BaseClass : component
// Class : has_dat
// Description : Hasta que dato
// Author : El Fer Blocks
// Creation : 2023-10-11
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class has_dat extends COMPONENT {
  constructor() {
    super();
    this.prop.BaseClass = "editText";
    this.prop.textLabel = " Y ";
    this.prop.MaxLength = 30;
    this.prop.Value = " ";
    this.style.marginLeft = "10px";
    this.prop.ErrorMessage = "Valor menor al valor anterior";
  }

  async valid() {
    if (this.prop.Value < this.Parent.des_dat.prop.Value)
      return false

    return true
  }
}
