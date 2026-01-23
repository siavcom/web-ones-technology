//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : json
// @class : dat_xml
// Description : Componente tab_xml
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 21/08/25
// Update Date  : 
/////////////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class var_dxm extends COMPONENT {
    constructor() {
        super()
        this.prop.Type = 'json'
        this.prop.updateKey = false
        this.style.width = '400px'
    }

    async when() {
        this.Parent.bt_save.prop.Visible = true
        return true
    }
}