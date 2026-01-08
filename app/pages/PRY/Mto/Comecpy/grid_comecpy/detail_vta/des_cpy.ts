//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : des_cpy
// Description : DESCRIPCION DE LA PARTIDA
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class des_cpy extends COMPONENT {

  constructor() {
    super()


    this.prop.Type = 'textArea'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.des_cpy'
    this.prop.MaxLength = 1024
    this.prop.Capture = true
    this.prop.Disabled = true
    this.style.width = "max-content"
    this.inputStyle.width = "640px"
    this.inputStyle.height = "40px"
  }

  async valid() {
    if (this.prop.Value.trim().length == 0) {
      return false
    }

    return true
  }

}
