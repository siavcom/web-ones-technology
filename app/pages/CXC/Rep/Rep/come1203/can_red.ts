//////////////////////////////////////////////
// @baseClass  : component
// @class : text
// Description : Relacionado por documento
// @author: El Fer Blocks
// Creation : 2023-10-11
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class can_red extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Saldo minímo a considerar'
        this.prop.Type = "Text";
        this.prop.Value = "0.04999"
        this.style.zIndex = 3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
        this.style.maxHeight = "100px";
        this.inputStyle.width = "100px";
        this.style.width = "auto";

    }



}
