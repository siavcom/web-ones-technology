//////////////////////////////////////////////
// @baseClass  : component
// @class : bt_accept
// Description : Acepta
// @author: El Fer Blocks
// Creation : 2024-04-16
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { IMGBUTTON } from "@/classes/imgButton";
export class bt_accept extends IMGBUTTON {
  constructor() {
    super();
    // this.prop.Value = "Close";
    this.prop.Capture = false;
    this.prop.BaseClass = "imgButton";
    this.prop.Image = "/Iconos/svg/accept.svg"; //bx-calendar.svg"
    this.style.width = "35px";
    this.style.float = "right"

  }

  override async click() {
    return this.Parent.close()
  }
}
