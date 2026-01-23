//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : can_cpy
// Description : DESCRIPCION DE LA PARTIDA
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
export class can_cpy extends COMPONENT {

  constructor() {
    super()
    this.prop.Caption = 'Cantidad a cotizar'
    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.can_cpy'
    this.prop.MaxLength = 1024
    this.prop.Decimals = 5
    this.prop.Disabled = true
    this.prop.Capture = true
    this.style.width = '256px'
    this.inputStyle.width = "128px"
  }
}
