//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : has_fec
// Description : desde que fecha
// Author : El Fer Blocks
// Creation : 2023-09-27
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
export class has_fec extends COMPONENT {

    constructor() {
        super()
        this.prop.Caption = 'Hasta la fecha'
        this.prop.Type = 'date'
        this.prop.Value = '1900-01-01'
    }
    override async init() {

        this.prop.Value = this.Form.mPublic.fpo_pge;
    }
    override async valid() {

        if (this.prop.Value < this.Parent.des_fec.prop.Valid)
            return false
        else
            return true

    }
}
