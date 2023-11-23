//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : fge_tpy
// Description : FORMATO DE IMPRESION DEL GENERADOR
// Author : El Fer Blocks
// Creation : 2023-06-29
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class fge_tpy extends COLUMN {

    constructor() {
        super()
        this.textLabel = 'Formato de impresión' // Column Header
        this.prop.ControlSource = 'vi_cap_cometpy.fge_tpy'
        this.prop.MaxLength=128
        this.prop.Capture=true
        this.prop.updateKey=false
        this.style.width='265px'
   }
}
