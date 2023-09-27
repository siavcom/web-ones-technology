//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : mco_pry
// Description : Moneda
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import {COMPONENT} from '@/classes/Component'

export class mon_rep extends COMPONENT {

    constructor() {
        super()

        this.prop.textLabel = 'Moneda'
        this.prop.BaseClass = 'comboBox'
        this.prop.ControlSource = 'vi_cap_comepry.mco_pry'
        this.prop.RowSourceType = 5 //1-Value, 2-Alias,3-sql 5-Array
        this.prop.ColumnCount = 2
        this.prop.BoundColumn = 2
        this.prop.ToolTipText = 'Moneda en la cual presentara el reporte'
        this.prop.Capture = false
        this.prop.updateKey = false
      //  this.prop.TabIndex=101
        this.style.zIndex=1
    }

    public async init() {
        const Var = this.Form.Var
        const des_mon = ['Todas',Var.pr1_pge, Var.pr2_pge, Var.pr3_pge, Var.pr4_pge, Var.pr5_pge]
        const num_mon = [0,1, 2, 3, 4, 5]
        this.prop.RowSource = [des_mon, num_mon]
        this.prop.Value=0

    }
}
