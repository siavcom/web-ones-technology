//////////////////////////////////////////////
// BaseClass : component
// Class : tip_opc
// Description : modificados por el usuario elegido (si/no)
// Author : MGSR
// Creation : 2025/08/08
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class tip_opc extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Solo modificados por este usuario '
        this.prop.Type = "checkBox";
        this.prop.Value = 0
        //        this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
