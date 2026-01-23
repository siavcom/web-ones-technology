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
    this.prop.Type = 'textArea'

    this.prop.Caption = "Mensaje a enviar";
    this.prop.Capture = false;

    this.style.width = 'max-content';
    this.inputStyle.width = 'revert-layer';
    this.prop.MaxLength = 1024
    this.prop.Capture = true
    this.inputStyle.width = "675px"
    this.inputStyle.height = "240px"

    this.captionStyle.fontSize = '17px'
    this.captionStyle.fontWeight = 'bold'

    // this.prop.Disabled = true
  }

}
