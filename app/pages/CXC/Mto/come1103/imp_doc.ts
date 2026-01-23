//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : imp_doc
// Description : Componente imp_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class imp_doc extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.Type = 'number';
        this.prop.ControlSource = "vi_cap_comedoc.imp_doc";
        this.prop.InputMask = ('99,999,999.99999');
        this.style.width = '256px';
        this.inputStyle.width = '105px';
        this.prop.Caption = "Importe";
        this.captionStyle.width = '100px';

        //propiedades
    }

    override async init() {
        this.prop.Decimals = Public.value.dcp_pge
    }

    // Evento   :GotFocus
    // Objeto  :imp_doc
    // Tipo   :Cuadro de texto
    // Comentarios :guarda el datos anterior
    override async gotFocus() {
        let m = {}   // inicializamos m
        this.Form.dat_ant = this.prop.Value
    }   // Fin Procedure

    // Evento   :When
    // Objeto  :imp_doc
    // Tipo   :Cuadro de texto
    // Comentarios :Se preguntara el importe si no tiene movimientos
    override async when() {
        let m = {}   // inicializamos m
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