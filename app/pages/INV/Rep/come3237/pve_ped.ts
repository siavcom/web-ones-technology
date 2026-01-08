//////////////////////////////////////////////
// BaseClass : component
// Class : pve_ped
// Description : se incluye  Pedidos proveedores
// Author : MGSR
// Creation : 2025/05/05
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class pve_ped extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = '+ Pedidos proveedores'
        this.prop.Type = "checkBox";
        this.prop.Value = 1
        //        this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
