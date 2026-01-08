//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : Component
// Class : dip_cpy
// Description : deescripcion del insumo del proveedor
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'


export class dip_cpy extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = 'Insumo del proveedor'
    this.prop.Type = 'textArea'
    this.prop.ControlSource = 'vi_cap_comecpy.dip_cpy'
    this.prop.MaxLength = 1024
    this.prop.Capture = true
    this.prop.Disabled = true
    this.inputStyle.width = "444px"
    this.inputStyle.height = "auto"
  }
}
