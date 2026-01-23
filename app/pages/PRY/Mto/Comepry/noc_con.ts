//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : noc_con
// Description : Nombre del consignatario
// @author: El Fer Blocks
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
    this.prop.Type = 'text'
    this.prop.BaseClass = 'textLabel'
    this.prop.ControlSource = 'vi_cap_comepry.noc_con'
    this.inputStyle.width = "400px"
    //this.inputStyle.width = "inherit"
  }
}
