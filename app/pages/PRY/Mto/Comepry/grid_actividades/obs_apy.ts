//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : obs_apy
// Description : Observaciones
// @author: El Fer Blocks
// Creation : 2024-02-12
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class obs_apy extends COLUMN {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.ColumnTextLabel = 'Observaciones' // Column Header
    this.prop.Type = 'textArea'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comeapy.obs_apy'
    this.prop.Placeholder = 'Observaciones'
    this.prop.MaxLength = 1024
    this.prop.Capture = true
    this.prop.updateKey = false
    this.style.width = '250px'
  }
}
