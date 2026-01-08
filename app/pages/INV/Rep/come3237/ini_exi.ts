//////////////////////////////////////////////
// BaseClass : component
// Class : ini_exi
// Description : + Existencia física
// Author : MGSR
// Creation : 2025/05/05
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class ini_exi extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Considerando: + Existencia física'
        this.prop.Type = "checkBox";
        this.prop.Value = 1
        //        this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
