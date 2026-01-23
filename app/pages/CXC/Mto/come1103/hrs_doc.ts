//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : hrs_doc
// Description : Componente hrs_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class hrs_doc extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.Type = 'time';
        this.prop.ControlSource = "vi_cap_comedoc.hrs_doc";
        this.prop.InputMask = "99:99:99";
        this.style.width = 'fit-content';
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

        if (this.prop.ReadOnly) {
            return false

        } // End If 
        return true
    }   // Fin Procedure


    //metodo
}