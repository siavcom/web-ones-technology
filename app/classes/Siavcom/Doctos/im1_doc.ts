//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : im1_doc
// Description : Componente im1_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class im1_doc extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.Type = 'number';

        this.prop.ControlSource = "vi_cap_comedoc.im1_doc";
        this.prop.InputMask = ('99,999,999.99999');
        this.style.width = '256px';
        this.inputStyle.width = '105px';
        this.captionStyle.width = '100px';

        //propiedades
    }
    public override init() {
        super.init();
        this.prop.Caption = (Public.value.di1_pge);
        this.prop.Decimals = Public.value.dcp_pge
        return
    }


    // Evento   :GotFocus
    // Objeto  :im1_doc
    // Tipo   :Cuadro de texto
    // Comentarios :guarda el datos anterior
    override async gotFocus() {
        let m = {}   // inicializamos m
        this.Form.dat_ant = this.prop.Value
    }   // Fin Procedure

    // Evento   :When
    // Objeto  :im1_doc
    // Tipo   :Cuadro de texto
    // Comentarios :Se preguntarÃ¡ el impuesto segun el tipo de cliente o proveedor
    override async when() {
        this.prop.ReadOnly = this.prop.ReadOnly ? this.prop.ReadOnly : await !this.Form.rev_per('imp_doc')
        if (this.prop.ReadOnly) {
            this.prop.Valid = true
            this.prop.nextFocus = true
            return false
        } // End If 


        return true

    }   // Fin Procedure




    //metodo
}