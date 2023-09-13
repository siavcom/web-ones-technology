//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : query
// Description : Equipo
// Author : El Fer Blocks
// Creation : 2023-03-13
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class query extends COMPONENT {

  constructor() {
    super()

    // const nom_ind=renglon[i]['nom_ind']

   // this.prop.textLabel = 'Filtro'
    this.prop.Type = 'textArea'
    this.prop.BaseClass = 'editText'
    this.prop.Capture = false
    this.prop.ReadOnly= true
    this.prop.Visible=false
    this.prop.Placeholder='SQL QUERY'
    this.prop.componentStyle.cols=80

  }  
}
