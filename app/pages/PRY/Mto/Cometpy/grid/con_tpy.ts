//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : con_tpy
// Description : CONCECUTIVO DE TIPO DE PROYECTO
// Author : El Fer Blocks
// Creation : 2023-06-29
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class con_tpy extends COLUMN {

    constructor() {
        super()

        this.prop.ColumnTextLabel = 'Consecutivo' // Column Header
        this.prop.Type = 'number'
        this.prop.ControlSource = 'vi_man_cometpy.con_tpy'
        this.prop.ToolTipText = 'Consecutivo por tipo por tipo de proyecto'
        this.prop.Min = '1'
        this.prop.Max = '999999'
        this.prop.MaxLength = 6
        this.prop.Capture = true
        this.prop.updateKey = false
        this.prop.Decimals = 0
        this.style.width = '64px'
    }
}
