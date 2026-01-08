//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : Component
// Class : dea_prv
// Description : deescripcion del insumo con el proveedor
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'


export class dea_prv extends COMPONENT {

  constructor() {
    super()

    this.prop.Caption = 'Descripcion '
    this.prop.Type = 'textArea'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.dea_prv'
    this.prop.Capture = true
    this.inputStyle.width = "512px"
    this.inputStyle.height = "52px"
  }
}
