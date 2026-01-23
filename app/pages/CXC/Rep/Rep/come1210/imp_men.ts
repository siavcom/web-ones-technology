//////////////////////////////////////////////
// @baseClass  : component
// @class : imp_men
// Description : Importe menor o igual que
// @author: MGSR
// Creation : 2025-06-09
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class imp_men extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Importe menor o igual a '
        this.prop.Type = "Text";
        this.prop.Value = "0"
        this.style.zIndex = 3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
        this.style.maxHeight = "120px";
        this.inputStyle.width = "120px";
        this.style.width = "auto";

    }



}
