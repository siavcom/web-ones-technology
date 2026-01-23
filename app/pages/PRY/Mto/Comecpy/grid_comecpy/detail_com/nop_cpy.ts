//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// @class : nop_cpy
// Description : Nombre del proveedor externo
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'


export class nop_cpy extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.BaseClass = 'editText'
    this.prop.Caption = 'Proveedor'
    this.prop.ControlSource = 'vi_cap_comecpy.nop_cpy'
    this.prop.Capture = true
    this.inputStyle.maxWidth = "512px"
  }
}
