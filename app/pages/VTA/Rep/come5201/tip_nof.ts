//////////////////////////////////////////////
// @baseClass  : component
// @class : tip_nof
// Description : reporte con datos fiscales o no
// @author: El Fer Blocks
// Creation : 2025/03/25
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class tip_nof extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Datos fiscales'
        this.prop.Type = "checkBox";
        this.prop.Value = 0
        //        this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
