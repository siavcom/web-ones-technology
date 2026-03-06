//////////////////////////////////////////////
// BaseClass : component
// Class : cte_ped
// Description : - Pedidos clientes
// Author : El Fer Blocks
// Creation : 2025/05/05
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class cte_ped extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = '- Pedidos clientes'
        this.prop.Type = "checkBox";
        this.prop.Value = 1
        //        this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
