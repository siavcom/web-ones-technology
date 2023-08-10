//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : tdo_tdo
// Description : Documento a generar
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class tdo_tdo extends COLUMN {

    constructor() {
        super()
   
       // const nom_ind=renglon[i]['nom_ind']
         
        this.textLabel = 'Documento a generar ' // Column Header
        this.prop.Type ='text'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_cometap.tdo_tdo'
        this.prop.Placeholder = 'Tipo'
        this.prop.MaxLength=3
        this.prop.Capture=true
        this.prop.updateKey=true
        this.prop.RowSource=''      // 
        this.style.zIndex = 1
        this.style.width='40px'

       

    }

}
