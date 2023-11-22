//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : efi_tap
// Description : Tipos de estatus
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class efi_tap extends COLUMN {

    constructor() {
        super()
   
       // const nom_ind=renglon[i]['nom_ind']
         
        this.textLabel = 'Estatus final' // Column Header
        this.prop.ControlSource = 'vi_cap_cometap.efi_tap'
        this.prop.Capture=true
        this.prop.MaxLength=2
        this.style.width='20px'


    }
}
