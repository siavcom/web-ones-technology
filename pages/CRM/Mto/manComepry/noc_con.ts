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

import { captureComponent } from '@/classes/captureComponent'


export class noc_con extends captureComponent {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

    this.prop.textLabel = 'Nombre'
    this.prop.Type = 'text'
    this.prop.BaseClass = 'editText'
    this.prop.ControlSource = 'lla1_con.noc_con'
    this.prop.Capture = false
    this.prop.updateKey = false
    this.prop.Disabled = true
    this.prop.componentStyle.width='600px'    

}
}