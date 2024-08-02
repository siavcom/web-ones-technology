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
    this.prop.textLabel = "Hasta ";
    this.prop.MaxLength = 30;
    this.prop.Value = " ";
    this.prop.ErrorMessage = "Valor menor al valor anterior";
    this.style.marginLeft = "10px";
    this.inputStyle.width = "128px";
    //this.intputStyle.width = 'auto';
  }

  async valid() {
    if (this.prop.Value < this.Parent.des_dat.prop.Value)
      return false

    if (this.prop.Type == 'text' && this.prop.Value.trim().length == 0)
      this.prop.Value = 'z'.repeat(this.prop.MaxLength)


    return true
  }
}
