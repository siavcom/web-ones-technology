//////////////////////////////////////////////
// BaseClass : component
// Class : bt_accept
// Description : Acepta
// Author : El Fer Blocks
// Creation : 2024-04-16
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class bt_accept extends COMPONENT {
  constructor() {
    super();
    // this.prop.Value = "Close";
    this.prop.Capture = false;
    this.prop.BaseClass = "imgButton";
    this.prop.Image = "/Iconos/svg/accept.svg"; //bx-calendar.svg"
    this.style.width = "35px";
    this.style.float = "right"

  }

  async click() {

    this.Parent.close()
  }
}
