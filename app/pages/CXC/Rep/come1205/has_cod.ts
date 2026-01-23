//////////////////////////////////////////////
// @baseClass  : component
// @class : has_cod
// Description : Hasta que codigo
// @author: El Fer Blocks
// Creation : 2023-11-22
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class has_cod extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Hasta que codigo de cliente'
        this.prop.Type = "string"
        this.prop.MaxLength = 12
        this.prop.Value = " "

    }
}
