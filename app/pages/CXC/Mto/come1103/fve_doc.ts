//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : fve_doc
// Description : Componente fve_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class fve_doc extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.Type = 'date';
        this.prop.Caption = "Vencimiento";
        this.prop.ControlSource = "vi_cap_comedoc.fve_doc";
        this.prop.ErrorMessage = "Fecha menor a fecha de vencimiento";
        //propiedades
    }

    // Evento   :Valid
    // Objeto  :fve_doc
    // Tipo   :Cuadro de texto
    // Comentarios :Es la validación de la fecha de expedición de vencimiento
    override async valid(sw_rel?: boolean) {
        let m = {}   // inicializamos m
        if (this.Form.fec_doc.prop.Value > this.prop.Value) {
            this.prop.Valid = false
            return false

        } // End If 


        return true

    }   // Fin Procedure

    // Evento   :When
    // Objeto  :fve_doc
    // Tipo   :Cuadro de texto
    // Comentarios :Cuando se permi la captura de la fecha de vencimiento
    override async when() {

        this.prop.ReadOnly = this.prop.ReadOnly ? this.prop.ReadOnly : await !this.Form.rev_per(this.prop.Name)
        if (this.prop.ReadOnly) {
            this.prop.Valid = true
            this.prop.nextFocus = true
            return false
        } // End If 
        const cometdo = await goto(0, 'cometdo')
        if (cometdo.cop_nom + cometdo.coa_tdo == 'CC' || cometdo.cop_nom + cometdo.coa_tdo == 'PA') {
            this.Form.fve_doc.prop.Valid = false
            this.Form.fve_doc.prop.ReadOnly = false
            return true
        } // End If 

        this.prop.Value = this.Form.fec_doc.prop.Value
        this.prop.Valid = true
        this.prop.ReadOnly = true


        return false

    }   // Fin Procedure




    //metodo
}