//////////////////////////////////////////////
// @baseClass  : component
// @class : bt_cancelas
// Description : Acepta
// @author: El Fer Blocks
// Creation : 2024-04-16
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

export class bt_close extends IMGBUTTON {
  constructor() {
    super();
    // this.prop.Value = "Close";
    this.prop.Capture = false;
    this.prop.Image = "/Iconos/svg/close-color.svg"; //bx-calendar.svg"
    this.prop.Caption = 'Cerrar'
    this.style.float = "right"
    this.style.width = '48px'

  }

  override async click() {
    this.Parent.close()
    //await this.Parent.close()

  }
}
