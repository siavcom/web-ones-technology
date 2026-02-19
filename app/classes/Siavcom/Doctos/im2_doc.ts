//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : im2_doc
// Description : Componente im2_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class im2_doc extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.Type = 'number';

        this.prop.ControlSource = "vi_cap_comedoc.im2_doc";
        this.prop.Disabled = false;
        this.prop.InputMask = ('99,999,999.99999');
        this.style.width = '256px';
        this.inputStyle.width = '105px';
        this.captionStyle.width = '100px';

        //propiedades
    }


    public override init() {
        super.init();
        this.prop.Caption = (Public.value.di2_pge);
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
        return await this.Form.rev_per('imp_doc')

    }   // Fin Procedure

    //metodo
}