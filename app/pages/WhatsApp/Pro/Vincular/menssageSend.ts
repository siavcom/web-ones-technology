//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : men_env
// Description : Envia mensaje al whatsapp
// @author: El Fer Blocks
// Creation : 2025-18-Enero
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class MESSAGESEND extends COMPONENT {

  constructor() {
    super();
    this.prop.Caption = "Mensaje a enviar";
    this.prop.Capture = false;
    this.prop.Visible = false
    this.style.width = '512px'
    this.inputStyle.width = '512px'
    // this.prop.Disabled = true
  }
  override async valid() {

    if (await this.Form.phone.valid()) {
      // this.Form.socket.emit('sendMessage', this.Form.phone.prop.Value, this.prop.Value)
      this.Form.send('sendMessage', { phone: this.Form.phone.prop.Value, message: this.prop.Value })
      return true
    }

    return true
  }
}
