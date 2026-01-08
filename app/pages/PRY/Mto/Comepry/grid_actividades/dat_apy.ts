//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : dat_apy
// Description : Datos de la actividad
// Author : El Fer Blocks
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
    this.prop.ControlSource = 'vi_cap_comeapy.dat_apy'
    this.prop.Capture = true
    this.prop.updateKey = false


    this.style.width = '200px'

  }
  async when() {
    this.prop.ReadOnly = this.Parent.tap_tap.when();
    return !this.prop.ReadOnly;
  }
}
