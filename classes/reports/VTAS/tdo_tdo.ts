//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : alm_rep
// Description : Almacen
// Author : El Fer Blocks
// Creation : 2023-09-20
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
export class tdo_tdo extends COMPONENT {

    constructor() {
        super()

        this.prop.textLabel = 'Documento'
        this.prop.BaseClass = 'comboBox'
        this.prop.ControlSource = 'select des_tdo,tdo_tdo from man_cometdo'
        this.prop.RowSourceType = 3 //1-Value, 2-Alias,3-sql 5-Array
        this.prop.ColumnCount = 2
        this.prop.BoundColumn = 2
        this.prop.Capture = false
        this.prop.updateKey = false
        this.style.tabindex=1
        this.style.zIndex=3
    }
}
