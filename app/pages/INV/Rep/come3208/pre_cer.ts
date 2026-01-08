//////////////////////////////////////////////
// BaseClass : component
// Class : pre_cer
// Description : Indicador para insumos con precio 0
// Author : MGSR
// Creation : 2025-01-23
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class pre_cer extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Insumos con precio cero '
        this.prop.Type = "checkBox";
        this.prop.Value = 0
        //   this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
