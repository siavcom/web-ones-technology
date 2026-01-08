//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : per_apy
// Description : Orden de la actividad
// Author : El Fer Blocks
// Creation : 2023-11-17
// Update Date  : 
/////////////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class per_apy extends COLUMN {

    constructor() {
        super()

        // const nom_ind=renglon[i]['nom_ind']
        this.prop.ColumnTextLabel = 'Núm.' // Column Header
        this.prop.Type = 'number'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_agenda.per_apy'
        this.prop.Disabled = true
        this.prop.Decimals = 0
        this.style.width = '32px'
    }

    ////////////////////////////////// 
    // event when 
    ///////////////////////////////////

    async when() {
        this.prop.ReadOnly = true
        return false

    }
}
