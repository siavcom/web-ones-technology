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

import { captureComponent } from '@/classes/captureComponent'


export class mco_pry extends captureComponent {

    constructor() {
        super()

        // const nom_ind=renglon[i]['nom_ind']

        this.prop.textLabel = 'Cotizar en '
        this.prop.BaseClass = 'comboBox'
        this.prop.ControlSource = 'vi_cap_comepry.mco_pry'
        this.prop.RowSourceType = 5 //1-Value, 2-Alias,3-sql 5-Array
        this.prop.ColumnCount = 2
        this.prop.BoundColumn = 2
        this.prop.ToolTipText = 'Moneda en la cual se cotizará el proyecto'
        this.prop.Capture = true
        this.prop.updateKey = false
        this.style.zIndex=3
    }

    public async init() {
        const Var = this.Form.publicVar
        const des_mon = [Var.pr1_pge, Var.pr2_pge, Var.pr3_pge, Var.pr4_pge, Var.pr5_pge]
        const num_mon = [1, 2, 3, 4, 5]
        this.prop.RowSource = [des_mon, num_mon]

    }
}
