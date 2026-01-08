//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : Component
// Class : im5_doc
// Description : Componente im5_doc
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class im5_doc extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.Type = 'number';

        this.prop.ControlSource = "vi_cap_comedoc.im5_doc";
        this.prop.InputMask = ('99,999,999.99999');
        this.style.width = '256px';
        this.inputStyle.width = '105px';
        this.captionStyle.width = '100px';

        //propiedades
    }
    public override init() {
        super.init();
        this.prop.Caption = (Public.value.di5_pge);
        this.prop.Decimals = Public.value.dcp_pge
        return
    }


    // Evento   :GotFocus
    // Objeto  :im2_doc
    // Tipo   :Cuadro de texto
    // Comentarios :guarda el datos anterior
    override async gotFocus() {
        let m = {}   // inicializamos m
        this.Form.dat_ant = this.prop.Value
    }   // Fin Procedure


    // Evento   :When
    // Objeto  :im2_doc
    // Tipo   :Cuadro de texto
    // Comentarios :Se preguntarÃ¡ el impuesto segun el tipo de cliente o proveedor
    override async when() {
        let m = {}   // inicializamos m
        console.log('when im5_doc this.prop.ReadOnly', this.prop.ReadOnly)
        this.prop.ReadOnly = this.prop.ReadOnly ? this.prop.ReadOnly : await !this.Form.rev_per('imp_doc')
        if (this.prop.ReadOnly) {
            this.prop.Valid = true

            return false
        } // End If 

        return true

    }   // Fin Procedure





    //metodo
}