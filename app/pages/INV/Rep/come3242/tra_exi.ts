//////////////////////////////////////////////
// BaseClass : component
// Class : tra_exi
// Description : se incluye + Existencia almacén en tránsito
// Author : MGSR
// Creation : 2025/05/05
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class tra_exi extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = '+ Existencia almacén en tránsito'
        this.prop.Type = "checkBox";
        this.prop.Value = 1
        //        this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
