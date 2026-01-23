//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : ven_ven
// Description : Componente ven_ven
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
import { d_nom_ven } from "./d_nom_ven";
//imports

export class ven_ven extends CAPTURECOMPONENT {
    //public
    public d_nom_ven: d_nom_ven = new d_nom_ven();
    constructor() {
        super();
        this.prop.Caption = "Vendedor";
        this.prop.Type = 'number';
        this.prop.Decimals = 0;
        this.prop.ControlSource = "vi_cap_comedoc.ven_ven";
        this.prop.Min = '0'
        this.prop.Max = '999999'
        this.inputStyle.width = '64px';
        this.prop.ErrorMessage = 'No existe el vendedor'
        this.asignaRecno()

        //propiedades
    }


    // Evento   :Valid
    // Objeto  :ven_ven
    // Tipo   :Cuadro de texto
    // Comentarios :Es la validación del vendedor
    override async valid(sw_rel?: boolean) {
        let m = {}   // inicializamos m
        if (this.prop.Value == 0) {
            this.d_nom_ven.prop.Value = ''
            this.Form.com_doc.prop.Value = 0
            this.Form.com_doc.prop.Valid = true
            this.Form.com_doc.prop.ReadOnly = true
            return true
        } // End If 

        m.ven_ven = this.prop.Value
        const lla1_ven = goto(0, 'lla1_ven')

        if (lla1_ven == null || m.ven_ven != lla1_ven.ven_ven) {
            // si cambio de vendedor o es un vendedor nuevo
            await use('lla1_ven', m) // use lla1_ven lla1_ven

            const lla1_ven = await goto(0, 'lla1_ven')
            if (lla1_ven == null)
                return false

            this.d_nom_ven.prop.Value = lla1_ven.nom_ven
            // asignamos nombre
            const vi_cap_comedoc = await scatter(['key_pri'], 'vi_cap_comedoc')

            if (vi_cap_comedoc.key_pri > 0 && this.Form.coa_tdo.Value == 'C')
                this.Form.com_doc.prop.Value = lla1_ven.pco_ven

        } // End If 

        return true

    }   // Fin Procedure
    override async when() {
        let m = {}   // inicializamos m

        this.prop.ReadOnly = this.prop.ReadOnly ? this.prop.ReadOnly : await !this.Form.rev_per(this.prop.Name)
        if (this.prop.ReadOnly) {
            this.prop.Valid = true
            this.Form.com_doc.prop.ReadOnly = true
            this.Form.com_doc.prop.Valid = true
            this.prop.nextFocus = true
            return false
        } // End If 
        return true
    }   // Fin Procedure
    //metodo
}