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
        this.prop.ErrorMessage = 'La fecha debe ser mayor o igual a la fecha desde'
    }
    override async init() {

        this.prop.Value = this.Form.mPublic.fpo_pge;
    }
    override async valid() {

        if (this.prop.Value < this.Parent.des_fec.prop.Value) {
            MessageBox('La fecha debe ser mayor o igual a la fecha desde', 16, 'ERROR')
            return false
        }
        else
            return true

    }
}
