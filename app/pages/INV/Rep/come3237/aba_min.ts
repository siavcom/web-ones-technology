//////////////////////////////////////////////
// BaseClass : component
// Class : sep_fam
// Description : Existencia menor a minímo
// Author : El Fer Blocks
// Creation : 2025/05/05
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class aba_min extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'solo insumos con existencia menor a minímo'
        this.prop.Type = "checkBox";
        this.prop.Value = 0
        //        this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
