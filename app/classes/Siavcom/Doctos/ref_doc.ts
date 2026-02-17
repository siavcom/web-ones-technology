//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : ref_doc
// Description : Componente ref_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class ref_doc extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.Caption = "Referencia";
        this.prop.ControlSource = "vi_cap_comedoc.ref_doc";
        this.inputStyle.width = '300px';
        //propiedades
    }

    override async when() {
        return await this.Form.rev_per('ref_doc')
    }   // Fin Procedure

    //metodo
}