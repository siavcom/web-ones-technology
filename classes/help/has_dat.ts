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
    this.prop.Caption = " Y ";
    this.prop.MaxLength = 30;
    this.prop.Value = " ";
    this.prop.Visible = false;
    this.style.marginLeft = "10px";
    this.inputStyle.fontSize = "17px";
    this.inputStyle.fontWeight = "bold";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";

    this.prop.ErrorMessage = "Valor menor al valor anterior";
  }

  async valid() {
    if (this.prop.Value < this.Parent.des_dat.prop.Value)
      return false

    return true
  }
}
