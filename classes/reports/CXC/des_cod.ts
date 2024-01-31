//////////////////////////////////////////////
// BaseClass : component
// Class : des_cod
// Description : desde que codigo de cliente
// Author : El Fer Blocks
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

        this.prop.textLabel = 'Desde que codigo de cliente'
        this.prop.Type = "text"
        this.prop.BaseClass = 'editText'
        this.prop.MaxLength=12
        this.prop.Value=" "
        this.style.zIndex=5  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
        
    }
}
