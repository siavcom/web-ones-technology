//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// @class : med_dpy
// Description : MEDIDA
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class med_cpy extends COMPONENT {

  constructor() {
    super()
    this.prop.Caption = 'Unidad'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.med_cpy'
    this.prop.Capture = true
    this.prop.Disabled = true
    this.style.width = '256px'
    this.inputStyle.width = "128px"
  }
}
