//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : fco_tpy
// Description : FORMATO DE IMPRESION DE LA COTIZACION
// Author : El Fer Blocks
// Creation : 2023-06-29
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class fco_tpy extends COLUMN {

    constructor() {
        super()
   
       // const nom_ind=renglon[i]['nom_ind']
         
        this.textLabel = 'Formato de cotizacion' // Column Header
        this.prop.ControlSource = 'vi_cap_cometpy.fco_tpy'
        this.prop.MaxLength=128
        this.prop.Capture=true
        this.prop.updateKey=false
        this.style.width='265px'

   }
}
