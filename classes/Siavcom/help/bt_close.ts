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
    console.log('bt_close table', this.Parent.browse.prop.Value)

    // asignamos el valor retornado por el browse
    if (this.Parent.browse.prop.Value > '   ') {
      this.Form.cod_nom.prop.Value = this.Parent.browse.prop.Value
      this.Form.cod_nom.valid()

    }
    this.Parent.prop.Visible = false

  }
}
