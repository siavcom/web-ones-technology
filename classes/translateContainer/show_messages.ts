//////////////////////////////////////////////
// BaseClass : component
// Class : bt_messages
// Description : Muestra traduccion de mensajes
// Author : El Fer Blocks
// Update Date  : 2025-03-03
/////////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
export class show_messages extends COMPONENT {
  constructor() {
    super();
    // this.prop.Caption = "Close";
    this.prop.Capture = false;
    this.prop.BaseClass = "imgButton";
    this.prop.Caption = 'Show Messages'
    this.prop.Image = "/Iconos/svg/accept.svg"; //bx-calendar.svg"
    this.style.width = "35px";
    this.style.float = "right"

  }

  async click() {

    const m = {
      for_lan: this.Form.prop.Name,
      lan_lan: this.Form.mPublic.lan_lan ? this.Form.mPublic.lan_lan : '   ',
    }
    this.Sql.use('vi_cap_db_messages', m)
    this.Parent.gridMessages.prop.RecordSource = 'vi_cap_db_messages'
    this.Parent.gridMessages.prop.Visible = true

  }
}
