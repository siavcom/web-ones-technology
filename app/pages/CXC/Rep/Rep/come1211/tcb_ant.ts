//////////////////////////////////////////////
// @baseClass  : component
// @class : tcb_ant
// Description : Tipo de cambio al ultimo dia del mes anterior
// @author: MGSR
// Creation : 2025-06-12
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class tcb_ant extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Tipo de cambio al último día del mes anterior'
        this.prop.Type = "Text";
        this.prop.Value = "12.0000"
        this.style.zIndex = 3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
        this.style.maxHeight = "120px";
        this.inputStyle.width = "120px";
        this.style.width = "auto";

    }



}
