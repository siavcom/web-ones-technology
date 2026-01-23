//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// @class : de4_mov
// Description : DESCUENTO 4
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'


export class de4_mov extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = 'Descuento 4' // Column Header
    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.de4_mov'
    this.prop.Value = 0

    this.prop.MaxLength = 7
    this.prop.Min = "0.00"
    this.prop.Max = "100.00"

    this.prop.Decimals = 2
    this.prop.Decimals = 2
    this.prop.Disabled = false

    this.inputStyle.width = "64px"
  }
}
