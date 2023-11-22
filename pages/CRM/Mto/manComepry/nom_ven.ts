//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : nom_nom
// Description : Nombre 
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { captureComponent } from '@/classes/captureComponent'

export class nom_ven extends captureComponent {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.textLabel = 'Nombre Vendedor'
    this.prop.Type = 'text'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'lla1_ven.nom_ven'
    this.prop.Capture = false
    this.prop.updateKey = false
    this.prop.Disabled = true
    this.prop.componentStyle.width='600px' 
  }
}