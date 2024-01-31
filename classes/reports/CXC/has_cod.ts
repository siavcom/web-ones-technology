//////////////////////////////////////////////
// BaseClass : component
// Class : has_cod
// Description : Hasta que codigo
// Author : El Fer Blocks
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

        this.prop.textLabel = 'Hasta que codigo de cliente'
        this.prop.Type = "string"
        this.prop.MaxLength=12
        this.prop.Value=" "
        this.style.zIndex=5  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
        
    }
}
