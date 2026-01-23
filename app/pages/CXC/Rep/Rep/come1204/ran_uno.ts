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
export class ran_uno extends COMPONENT {

    constructor() {
        super()

        this.prop.Caption = 'Primer rango de 0 -'
        this.prop.Type = "Text";
        this.prop.Value = 7
        this.style.zIndex = 3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
        this.style.maxHeight = "50px";
        this.inputStyle.width = "50px";
        this.style.width = "auto";

    }
    override async init() {
        this.prop.Value = this.Form.mPublic.an1_pge;
    }
    override async interactiveChange() {
        this.Form.ran_dos.prop.Caption = 'Segundo rango de ' + (this.prop.Value + 1).toString() + ' - '
        return true
    }





}
