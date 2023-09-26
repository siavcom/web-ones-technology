//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : alm_rep
// Description : Almacen
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
export class alm_rep extends COMPONENT {

    constructor() {
        super()

        this.prop.textLabel = 'Almacen'
        this.prop.BaseClass = 'comboBox'
        this.prop.ControlSource = 'select des_tda,alm_tda from man_cometda'
        this.prop.RowSourceType = 3 //1-Value, 2-Alias,3-sql 5-Array
        this.prop.ColumnCount = 2
        this.prop.BoundColumn = 2
        this.prop.Capture = false
        this.prop.updateKey = false
        this.style.zIndex=3
    }
}
