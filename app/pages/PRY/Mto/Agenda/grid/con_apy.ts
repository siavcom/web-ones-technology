//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : con_apy
// Description : Consecutivo la actividad
// @author: El Fer Blocks
// Creation : 2024-02-12
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class con_apy extends COLUMN {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.ColumnTextLabel = 'Con.'
    this.prop.Type = 'number'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_agenda.con_apy'
    this.prop.Capture = true
    this.prop.updateKey = false
    this.prop.Disabled = true
    this.prop.Decimals = 0
    this.style.width = "32px"

  }

}
