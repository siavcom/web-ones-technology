//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : Component
// Class : fel_doc
// Description : Componente fel_doc
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
//import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class fel_doc extends COMPONENT {
    //public
    constructor() {
        super();

        this.prop.Caption = "Elaboración";

        this.prop.Type = 'date';
        this.prop.ControlSource = "vi_cap_comedoc.fel_doc";
        this.prop.Capture = false;
        //      this.style.DisabledBackColor = 'rgb(234, 234, 234)'
        this.prop.Disabled = true;
        //propiedades
    }


    //metodo
}