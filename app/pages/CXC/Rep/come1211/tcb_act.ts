//////////////////////////////////////////////
// BaseClass : component
// Class : tcb_act
// Description : Tipo de cambio al ultimo dia del mes actual
// Author : MGSR
// Creation : 2025-06-12
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class tcb_act extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Tipo de cambio al último día del mes actual'
        this.prop.Type = "Text";
        this.prop.Value = "12.0000"
        this.style.zIndex = 3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
        this.style.maxHeight = "120px";
        this.inputStyle.width = "120px";
        this.style.width = "auto";

    }



}
