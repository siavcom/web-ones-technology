//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : COLUMN
// BaseClass : Component
// Description : Porcentaje de ganancia
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class pga_cpy extends COMPONENT {

  constructor() {
    super()

    this.prop.Caption = 'Ganancia'
    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.pga_cpy'
    this.prop.Value = 0
    this.prop.Min = "0"
    this.prop.Max = "999.99"
    this.prop.Currency = "%"
    this.prop.MaxLength = 10
    this.prop.Decimals = 5
    this.prop.Capture = true
    this.inputStyle.width = "64px"
    this.prop.Disabled = true

  }
}
