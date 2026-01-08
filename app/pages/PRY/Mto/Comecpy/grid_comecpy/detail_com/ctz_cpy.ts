//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : Component
// Class : ctz_cpy
// Description : Numero de cotizacion
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'


export class ctz_cpy extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.BaseClass = 'editText'
    this.prop.Caption = 'Cotizacion número'
    this.prop.ControlSource = 'vi_cap_comecpy.ctz_cpy'
    this.prop.ToolTipText = "Cotizacion del proveedor"
    this.prop.Capture = true
    this.inputStyle.maxWidth = "124px"
  }
}
