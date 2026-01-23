//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @baseClass  : Component
// Description : PRECIO COTIZADO POR EL PROVEEDOR
// @author: El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class ppa_tca extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = 'Precio por contrato '
    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.ppa_tca'
    this.prop.Value = 0
    this.prop.Min = "0"
    this.prop.Max = "2147483647"
    this.prop.MaxLength = 12
    this.prop.Decimals = 5
    this.prop.Capture = true
    this.prop.Disabled = true
    //this.style.width = "max-content"
    this.inputStyle.width = "124px"
  }
}
