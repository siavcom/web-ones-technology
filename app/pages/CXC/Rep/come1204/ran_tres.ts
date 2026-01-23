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
export class ran_tres extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Tercer rango de '
        this.prop.Type = "Text";
        this.prop.Value = "21"
        this.style.zIndex = 3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
        this.style.maxHeight = "50px";
        this.inputStyle.width = "50px";
        this.style.width = "auto";

    }
    override async init() {
        this.prop.Value = this.Form.mPublic.an3_pge;
        this.prop.Caption = 'Tercer rango de ' + (parseInt(this.Form.ran_dos.prop.Value) + 1).toString() + " - "
    }


}
