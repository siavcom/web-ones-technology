//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : has_fec
// Description : desde que fecha
// Author : El Fer Blocks
// Creation : 2023-09-27
// Update Date  : 2035-06-30
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

        this.prop.ErrorMessage = 'Fecha inválida'
    }
    override async init() {
        this.prop.Value = this.Form.mPublic.fpo_pge;
    }
    override async valid() {
        if (this.Parent.des_fec.prop.Visible == true) {
            console.log('VALID VALUE=', this.prop.Value, 'Desde=', dateToString(this.Parent.des_fec.prop.Value))
            if (this.prop.Value < dateToString(this.Parent.des_fec.prop.Value)) {
                //await MessageBox('Fecha inválida',6,'Error')
                return false
            }
            else
                return true
        }
        else return true
    }
}
