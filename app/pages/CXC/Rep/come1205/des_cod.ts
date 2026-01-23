//////////////////////////////////////////////
// @baseClass  : component
// @class : des_cod
// Description : desde que codigo de cliente
// @author: El Fer Blocks
// Creation : 2023-11-22
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class des_cod extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Desde que codigo de cliente'
        this.prop.Type = "text"
        this.prop.BaseClass = 'editText'
        this.prop.MaxLength = 12
        this.prop.Value = " "

    }
}
