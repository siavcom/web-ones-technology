//////////////////////////////////////////////
// BaseClass : component
// Class : sep_con
// Description : Se separa por consignatarios
// Author :MGSR
// Creation : 2025/07/09
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class sep_con extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Separamos por consignatario '
        this.prop.Type = "checkBox";
        this.prop.Value = 0
        //        this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }



}
