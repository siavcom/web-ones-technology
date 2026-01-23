//////////////////////////////////////////////
// @baseClass  : component
// @class : per_act
// Description : Importe menor o igual que
// @author: MGSR
// Creation : 2025-06-09
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class per_act extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Año (AAAA) '
        this.prop.Type = "Text";
        this.prop.Value = "2025"
        this.style.zIndex = 3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
        this.style.maxHeight = "120px";
        this.inputStyle.width = "120px";
        this.style.width = "auto";
        this.prop.InputMask = "9999"
    }



}
