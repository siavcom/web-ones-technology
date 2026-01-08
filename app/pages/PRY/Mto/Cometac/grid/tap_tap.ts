//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : tap_tap
// Description : Actividad en un proyecto
// Author : El Fer Blocks
// Creation : 2023-06-29
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class tap_tap extends COLUMN {

    constructor() {
        super()
        this.prop.ColumnTextLabel = 'Actividad' // Column Header
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_cometac.tap_tap'
        this.prop.updateKey = true
        this.prop.MaxLength = 19
        this.style.width = '169px'

    }

}
