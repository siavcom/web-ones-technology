//////////////////////////////////////////////
// This class COMPONENT was generated automatically by web-ones-technology
// BaseClass : Component
// Class : dse_isu
// Description : deescripcion del insumo en Siavcom
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'


export class des_isu extends COLUMN {

  constructor() {
    super()
    this.prop.ControlSource = 'vi_cap_alm.des_isu'
    this.prop.Disabled = true
    this.prop.Type = 'textArea'
    this.style.width = "256px"
    this.style.fontSize = "x-small"
  }
}
