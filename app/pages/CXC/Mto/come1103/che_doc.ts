//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : Component
// Class : che_doc
// Description : Componente che_doc
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class che_doc extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.Caption = "Cheque u operación";
        this.prop.ControlSource = "vi_cap_comedoc.che_doc";
        this.inputStyle.width = '120px';
        //propiedades
    }


    // Evento   :Valid
    // Objeto  :che_doc
    // Tipo   :Cuadro de texto
    // Comentarios :Es la validación de la fecha de expedición de vencimiento
    override async valid(sw_rel?: boolean) {
        let m = {}   // inicializamos m
        const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')
        // THISFORM.VAL_che_doc nos indica si debe de validar que exista informacion . Esta definido en campos xml
        if (vi_cap_comedoc.cba_cba > 0 && this.Form.val_che_doc == '1' && this.prop.Value == space(len(this.prop.Value))) {
            MessageBox('Debe de digitar el cheque o la referencia de la operación', 16, 'Advertencia', 5000)
            this.prop.Valid = false
            return false

        } // End If 

        this.prop.Valid = true
        return true

    }   // Fin Procedure

    // Evento   :When
    // Objeto  :che_doc
    // Tipo   :Cuadro de texto
    // Comentarios :Permite la captura cuando hay cuenta bancaria
    override async when() {
        let m = {}   // inicializamos m
        this.prop.ReadOnly = !await this.Form.cba_cba.when()
        this.prop.ReadOnly = this.prop.ReadOnly ? this.prop.ReadOnly : await !this.Form.rev_per(this.prop.Name)

        if (this.prop.ReadOnly) {
            this.prop.Valid = true
            this.prop.nextFocus = true
            return false
        } // End If 
        return true
    }   // Fin Procedure

    //metodo
}