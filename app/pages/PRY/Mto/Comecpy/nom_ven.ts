//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : nom_nom
// Description : Nombre 
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class nom_ven extends COMPONENT {

  constructor() {
    super()

    this.prop.Type = 'text'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comepry.nom_ven'

    this.prop.Disabled = true
    this.inputStyle.width = '600px'
  }
}