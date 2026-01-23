//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : tpy_tpy
// Description : TIPO DE PROYECTO
// @author: El Fer Blocks
// Creation : 2023-06-29
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class tpy_tpy extends COLUMN {

    constructor() {
        super()
        this.prop.ColumnTextLabel = 'Tipo de proyecto' // Column Header
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_man_cometpy.tpy_tpy'
        this.prop.updateKey = true
        this.prop.MaxLength = 6
        this.style.width = '50px'

    }

}
