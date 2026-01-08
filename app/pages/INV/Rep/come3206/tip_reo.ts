//////////////////////////////////////////////
// BaseClass : component
// Class : tip_rep
// Description : Solo los de puntos de reorden
// Author : El Fer Blocks
// Creation : 2023-10-11
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class tip_reo extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Solo los que tienen puntos de reorden '
        this.prop.Type = "checkBox";
        this.prop.Value = 1
        //   this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
