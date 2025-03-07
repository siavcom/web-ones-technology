//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class :Messages
// Description :Valor del textLabel
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class messages extends COMPONENT {

  constructor() {
    super();
    this.prop.Type = 'textarea'
    this.prop.textLabel = "Messages";
    this.prop.ControlSource = "vi_cap_db_languages.messages";
    this.prop.Capture = true
    this.inputStyle.width = "496px";
    this.prop.ErrorMessage = 'Syntax error'
  }

  override async valid() {
    const lineBreak = char(13)
    const messages = this.prop.Value.replaceAll(lineBreak, '')
    try {
      const arr = eval(messages)
    } catch (error) {
      this.prop.ErrorMessage = error
      return false
    }

    return true

  }
}