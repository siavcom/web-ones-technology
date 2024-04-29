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
    this.style.width = "35px";
    this.style.float = "right"

  }

  async click() {
    this.Parent.close()
    /*
    console.log('bt_close table', this.Parent.browse.prop.Value)
    this.Parent.click()


    // asignamos el valor retornado por el browse
    if (this.Parent.browse.prop.Value > '   ') {
      this.Parent.Parent.prop.Value = this.Parent.browse.prop.Value
      this.Parent.Parent.valid()
      this.Parent.Parent.prop.Disabled = false
      this.Parent.Parent.prop.Visible = false
      

    }
    this.Parent.prop.Visible = false

  */
  }
}
