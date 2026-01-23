//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : fec_doc
// Description : Componente fec_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class fec_doc extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.Type = 'date';
        this.prop.Caption = "Fecha del Documento";
        this.prop.ControlSource = "vi_cap_comedoc.fec_doc";
        this.prop.ErrorMessage = "Fecha invalida";

        //propiedades
    }


    // Evento   :Valid
    // Objeto  :fec_doc
    // Tipo   :Cuadro de texto
    // Comentarios :Es la validación de la fecha de expedición del documento
    override async valid(sw_rel?: boolean) {
        let m = {}   // inicializamos m
        if (this.Form.prop.key == 27)
            return true

        const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')

        if (vi_cap_comedoc.key_pri || await oldValue('fec_doc', 'vi_cap_comedoc') != this.prop.Value) {
            this.Form.fve_doc.prop.Value = this.Form.fec_doc.prop.Value
            //  calculamos fecha de vencimiento

            // si es un cliente y un cargo o proveedor y abono
            const cometdo = await goto(0, 'cometdo')
            if (cometdo.cop_nom + cometdo.coa_tdo == 'CC' || cometdo.cop_nom + cometdo.coa_tdo == 'PA') {
                this.Form.fve_doc.prop.Value = this.Form.fve_doc.prop.Value + vi_cap_comenom.dcr_nom
            } // End If 

            //this.Form.fve_doc.refresh
        } // End If 

        if (year(this.prop.Value) <= 2000) {
            return false

        } // End If 

        if (year(this.prop.Value) >= 2050) {
            return false

        } // End If 


        return true

    }   // Fin Procedure

    override async when() {
        let m = {}   // inicializamos m


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