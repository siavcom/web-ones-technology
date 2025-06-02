//////////////////////////////////////////////
// BaseClass : component
// Class : for_imp
// Description : formsto de impresion a utilizar en el reporte
// Author : El Fer Blocks
// Creation : 2023-25-5
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class for_imp extends COMPONENT {

    constructor() {
        super()
        this.prop.Caption = 'Forma de impresión'
        this.prop.Type = 'text'
        this.prop.BaseClass = 'editText'
        this.prop.MaxLength = 64
        this.prop.TabIndex = 15
    }


}
