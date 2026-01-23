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

    this.prop.Caption = "Teléfono";
    this.prop.Capture = false;
    //this.prop.Disabled = true
    this.prop.Visible = false
    this.style.width = '128px'
    this.inputStyle.width = '93px'
    this.prop.Type = 'phone'
  }

  override async valid() {
    if (this.prop.Value.length < 10) {
      await MessageBox('El número de teléfono debe tener al menos 10 dígitos', 16, 'Error de validación')
      return false
    }
    return true
  }

}
