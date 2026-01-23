//////////////////////////////////////////////
// @baseClass  : component
// @class : comp
// Description : Relacionado por documento
// @author: El Fer Blocks
// Creation : 2023-10-11
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from '@/classes/Component'
export class con_doc extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Relacionado por documento'
        this.prop.Type = "checkBox";
        this.prop.Value = 0
        this.style.zIndex = 3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente

    }

    override async interactiveChange() {
        //    if (this.prop.Value.trim().length<4 && this.prop.Value.trim()!="??")
        if (this.prop.Value == 1) {
            this.Parent.tip_rep.prop.Value = 1
            return true
        }

    }
}
