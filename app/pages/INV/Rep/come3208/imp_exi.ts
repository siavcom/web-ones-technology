//////////////////////////////////////////////
// @baseClass  : component
// @class : imp_exi
// Description : Indica si va con existencia
// @author: MGSR
// Creation : 2025-01-23
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class imp_exi extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Con existencia '
        this.prop.Type = "checkBox";
        this.prop.Value = 0
        //   this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
