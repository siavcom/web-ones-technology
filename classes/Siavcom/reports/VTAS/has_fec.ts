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
        this.prop.textLabel = 'Hasta la fecha'
        this.prop.Type = 'date'
        this.prop.Value = '1900-01-01'
    }
    override async init() {

        this.prop.Value = this.Form.publicVar.fpo_pge;
    }
}
