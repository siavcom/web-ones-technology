//////////////////////////////////////////////
// BaseClass : component
// Class : sep_fam
// Description : Se separa por familias
// Author : El Fer Blocks
// Creation : 2023-10-11
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class opc_dos extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Producto mayor a mínimo'
        this.prop.Type = "checkBox";
        this.prop.Value = 1
        //   this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
