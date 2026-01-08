//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : Component
// Description : Costo de flete
// Author : El Fer Blocks
// Creation : 2024-04-02
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class cfl_cpy extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = 'Costo total del flete'
    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.cfl_cpy'
    this.prop.Decimals = 5
    this.inputStyle.width = '90px'
    this.style.width = '226px'
  }
}
