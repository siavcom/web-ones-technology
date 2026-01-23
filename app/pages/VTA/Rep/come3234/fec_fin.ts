//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : fec_fin
// Description : desde que fecha
// @author: El Fer Blocks
// Creation : 2023-09-27
// Update Date  : 2035-06-30
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
export class fec_fin extends COMPONENT {

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
        if (this.prop.Value < dateToString(this.Form.fec_ini.prop.Value)) {
            //await MessageBox('Fecha inválida',6,'Error')
            return false
        }

        return true
    }
}
