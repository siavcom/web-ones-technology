//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// @baseClass  : Component
// Description : Tiempo de entrega

// @author: El Fer Blocks
// Creation : 2024-04-02
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class ted_cpy extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = 'Tiempo de entrega'
    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.ted_cpy'
    this.prop.Decimals = 0
    this.prop.Currency = 'dias'
    this.inputStyle.width = '90px'
    this.style.width = '211px'
  }
}
