//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : des_tdn
// Description : Tipo de cliente
// Author : El Fer Blocks
// Creation : 2024-03-21
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
export class des_tdn extends COMPONENT {
    des_tdn = []  // arreglo de las medidas
    constructor() {
        super()
        this.prop.Type = 'text'
        this.prop.Caption = 'Tipo de  cliente'
        this.prop.ControlSource = 'vi_cap_comepry.des_tdn'

        this.prop.Disabled = true
        this.inputStyle.width = '256px'

    }


}


