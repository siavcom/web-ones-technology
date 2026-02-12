//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : fel_doc
// Description : Componente fel_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
//import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class d_fel_doc extends COMPONENT {
    //public
    constructor() {
        super();
        this.prop.Caption = "Elaboración";
        this.prop.BaseClass = 'textLabel';
        this.prop.Type = 'date';
        this.prop.ControlSource = "vi_cap_comedoc.fel_doc";
        this.prop.Capture = false;
        this.prop.Disabled = true;
        this.prop.Disabled = true;
        this.inputStyle.color = 'black';
        //propiedades
    }
    //metodo
}