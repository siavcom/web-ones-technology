//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : phone
// Description : Envia mensaje al whatsapp
// @author: El Fer Blocks
// Creation : 2025-18-Enero
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class PHONE extends COMPONENT {
  constructor() {
    super();
    this.prop.Type = 'phone'
    this.prop.Caption = "Teléfono";
    this.prop.Capture = false;
    //this.prop.Disabled = true

    this.style.width = 'max-content';
    this.captionStyle.fontSize = '17px'
    this.captionStyle.fontWeight = 'bold'
    this.inputStyle.width = '620px';



  }

  override async valid_olf() {
    if (this.prop.Value.length < 10) {
      await MessageBox('El número de teléfono debe tener al menos 10 dígitos', 16, 'Error de validación')
      return false
    }
    return true
  }

}
