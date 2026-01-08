//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : Component
// Class : nom_nom
// Description : Nombre del proveedor
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class nom_nom extends COMPONENT {

  constructor() {
    super()
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.nom_nom'

    this.prop.Capture = false
    this.prop.Disabled = true
    this.inputStyle.maxWidth = "250px"

  }
}
