//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : Component
// Class : ref_doc
// Description : Componente ref_doc
// Author : El Fer Blocks (Fernando Cuadras)
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
        this.prop.Type = 'text';
        this.prop.ControlSource = "vi_cap_comedoc.ref_doc";
        this.inputStyle.width = '300px';
        //propiedades
    }

    override async when() {

        let m = {}   // inicializamos m
        this.prop.ReadOnly = this.prop.ReadOnly ? this.prop.ReadOnly : await !this.Form.rev_per(this.prop.Name)
        if (this.prop.ReadOnly) {
            this.prop.Valid = true
            this.prop.nextFocus = true
            return false
        } // End If 

        const vi_cap_comedoc = await scatter([`${this.prop.Name}`], 'vi_cap_comedoc')


        this.prop.MaxLength = vi_cap_comedoc.ref_doc.length
        return true
    }   // Fin Procedure

    //metodo
}