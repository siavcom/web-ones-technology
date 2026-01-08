//////////////////////////////////////////////
// BaseClass : component
// Class : imp_exi
// Description : Si se considere solo productos con existencia
// Author : El Fer Blocks
// Creation : 2025/06/20
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class imp_exi extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Solo con existencia '
        this.prop.Type = "checkBox";
        this.prop.Value = 0
        //        this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
