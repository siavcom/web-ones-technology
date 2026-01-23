//////////////////////////////////////////////
// @baseClass  : component
// @class : arr_max
// Description : Existencia mayor al máximo
// @author: mgsr
// Creation : 2025/05/05
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class arr_max extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Solo insumos con existencia mayor al máximo'
        this.prop.Type = "checkBox";
        this.prop.Value = 0
        //        this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
