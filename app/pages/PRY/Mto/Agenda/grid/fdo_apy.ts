//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : fdo_apy
// Description : Fecha de generacion de documento
// Author : El Fer Blocks
// Creation : 2024-02-12
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class fdo_apy extends COLUMN {

  constructor() {
    super()
    this.prop.ColumnTextLabel = 'Fecha ' // Column Header
    this.prop.Type = 'date'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_agenda.fdo_apy'
    this.prop.ToolTipText = 'Fecha de generacion de documento'
    this.prop.Disabled = true
    this.style.width = '88px'
  }


}

