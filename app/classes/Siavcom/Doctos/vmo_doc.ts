//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : vmo_doc
// Description : Componente vmo_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
import { Bt_par_doc } from "./par_mon/Bt_par_doc";
import { par_mon } from "./par_mon/par_mon";
//imports

export class vmo_doc extends CAPTURECOMPONENT {
    //public
    public par_mon = new par_mon();
    public bt_par_doc = new Bt_par_doc();
    constructor() {
        super();
        this.prop.Type = 'number';
        this.prop.Caption = "Paridad";
        this.prop.ControlSource = "vi_cap_comedoc.vmo_doc";
        this.prop.Decimals = 5;
        // this.prop.InputMask = "99999.99999";
        this.prop.Min = '0.00001'
        this.prop.Max = '99999999'
        this.inputStyle.width = '92px';
        this.asignaRecno()
        //propiedades
    }

    // Evento   :Valid
    // Objeto  :vmo_doc
    // Tipo   :Cuadro de texto
    // Comentarios :Es la validación del valor de la moneda
    override async valid(sw_rel?: boolean) {
        let m = {}   // inicializamos m
        const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')
        switch (true) {
            case vi_cap_comedoc.mon_doc == 2:
                updateCampo(this.prop.Value, 'vi_cap_comedoc.vm2_doc', vi_cap_comedoc.recno)
                break
            case vi_cap_comedoc.mon_doc == 3:
                updateCampo(this.prop.Value, 'vi_cap_comedoc.vm3_doc', vi_cap_comedoc.recno)
                break
            case vi_cap_comedoc.mon_doc == 4:
                updateCampo(this.prop.Value, 'vi_cap_comedoc.vm4_doc', vi_cap_comedoc.recno)
                break
            case vi_cap_comedoc.mon_doc == 5:
                updateCampo(this.prop.Value, 'vi_cap_comedoc.vm5_doc', vi_cap_comedoc.recno)

        } // End switch 

        return true

    }   // Fin Procedure

    // Evento   :When
    // Objeto  :vmo_doc
    // Tipo   :Cuadro de texto
    // Comentarios :Solo se preguntarÃ¡ el valor de la moneda si es diferente a la principal
    override async when() {


        if (this.Form.mon_doc.prop.Value == 1 || await recCount('vi_cap_comepag') > 0)
            this.prop.ReadOnly = true

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