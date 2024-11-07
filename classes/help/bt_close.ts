//////////////////////////////////////////////
// BaseClass : component
// Class : bt_cancelas
// Description : Acepta
// Author : El Fer Blocks
// Creation : 2024-04-16
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class bt_close extends COMPONENT {
  constructor() {
    super();
    // this.prop.Value = "Close";
    this.prop.Capture = false;
    this.prop.BaseClass = "imgButton";
    this.prop.Image = "/Iconos/svg/close-color.svg"; //bx-calendar.svg"
    this.style.width = "64px";
    this.style.float = "right"

  }

  async click() {
    this.Parent.browse.prop.RowSource = ''
    this.Parent.prop.Visible = false
    //this.Parent.browse.super.close()
    this.Parent.Parent.prop.ReadOnly = false
    //await this.Parent.close()

  }
}
