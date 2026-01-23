//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : dat_apy
// Description : Datos de la actividad
// @author: El Fer Blocks
// Creation : 2023-07-10
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class dat_apy extends COLUMN {

  constructor() {
    super()
    this.prop.ColumnTextLabel = 'Datos' // Column Header
    this.prop.Type = 'json'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_agenda.dat_apy'
    this.prop.Capture = true
    this.prop.updateKey = false
    this.style.width = '180px'
    this.inputStyle.height = '13px'
    // this.inputStyle.minHeight = '64px'

  }

}
