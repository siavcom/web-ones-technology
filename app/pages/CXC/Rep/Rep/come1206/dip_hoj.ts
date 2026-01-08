//////////////////////////////////////////////
// BaseClass : component
// Class : dip_hoj
// Description :Dia por hoja si/no
// Author : El Fer Blocks
// Creation : 2025-06-03
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class dip_hoj extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Día por hoja '
        this.prop.Type = "checkBox";
        this.prop.Value = 0
        this.style.zIndex = 3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
