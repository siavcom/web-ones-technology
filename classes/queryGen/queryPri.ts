//////////////////////////////////////////////
// BaseClass : component
// Class : queryGen
// Description : Genera un Query principal
// Author : El Fer Blocks
// Creation : 2023-03-13
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { queryGen } from './queryGen'

export class queryPri extends queryGen {

    constructor() {
        super()
        this.usu_que = 'MAIN'
        this.prop.Caption = 'Principales'
        this.prop.Disabled = false
        this.query.prop.Visible = true
        this.prop.TabIndex = 12
    }



}

