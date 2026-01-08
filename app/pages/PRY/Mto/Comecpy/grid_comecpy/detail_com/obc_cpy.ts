//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : Component
// Class : obc_cpy
// Description : Observaciones
// Author : El Fer Blocks
// Creation : 2024-07-30
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class

///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'


export class obc_cpy extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Type = 'textArea'
    this.prop.Caption = 'Observaciones'
    this.prop.ControlSource = 'vi_cap_comecpy.obc_cpy'
    this.prop.Capture = true
    this.inputStyle.maxWidth = "600px"
  }
}
