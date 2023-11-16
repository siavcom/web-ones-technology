//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : ord_tap
// Description : Orden de la actividad
// Author : El Fer Blocks
// Creation : 2023-11-17
// Update Date  : 
/////////////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class ord_tap extends COLUMN {

    constructor() {
        super()
   
       // const nom_ind=renglon[i]['nom_ind']
         
        this.textLabel = 'Orden de la actividad' // Column Header
        this.prop.Type ='number'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_comeapy.ord_tap'
        this.prop.Disabled=true
        this.style.width='28px'
    }

    ////////////////////////////////// 
    // event when 
    ///////////////////////////////////
    
  async when() {
     this.prop.ReadOnly=true
     return false
    
    }
}
