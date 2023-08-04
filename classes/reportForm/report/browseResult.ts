//////////////////////////////////////////////
// This class container
// BaseClass : component
// Class : browseResult
// Description : Contenedor de resultado de obtener datos
// Author : El Fer Blocks
// Creation : 2023-08-03
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class browseResult extends COMPONENT {
    //table = {}  // Datos de la tabla
    constructor() {
        super()
        this.prop.BaseClass = 'browseLite'
        this.prop.RowSource = ''
    }
}
