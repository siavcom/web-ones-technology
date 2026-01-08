//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : noc_con
// Description : Nombre del consignatario
// Author : El Fer Blocks
// Creation : 2023-08-18
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class noc_con extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.Caption = ''
    this.prop.Type = 'text'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'vi_cap_comecpy.noc_con'
    this.prop.updateKey = false
    this.prop.Disabled = true
    this.inputStyle.maxWidth = "250px"
  }
}