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

export class bt_accept extends IMGBUTTON {
  constructor() {
    super();
    // this.prop.Caption = "Close";
    this.prop.Capture = false;
    this.prop.Image = "/Iconos/svg/accept.svg"; //bx-calendar.svg"
    this.style.width = "35px";
    this.style.float = "right"
  }

  async click() {
    this.Parent.close()
    this.Form.grid_comecpy.saveTable()

  }
}
