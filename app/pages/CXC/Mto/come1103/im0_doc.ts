//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : Component
// Class : im0_doc
// Description : Componente im0_doc
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class im0_doc extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.Type = 'number';

        this.prop.ControlSource = "vi_cap_comedoc.im0_doc";
        this.prop.Disabled = false;
        this.prop.InputMask = ('99,999,999.99999');
        this.style.width = '256px';
        this.inputStyle.width = '105px';
        this.captionStyle.width = '100px';


        //propiedades
    }

    public override init() {
        super.init();
        this.prop.Caption = (Public.value.di0_pge);
        this.prop.Decimals = Public.value.dcp_pge

        return
    }


    // Evento   :GotFocus
    // Objeto  :im0_doc
    // Tipo   :Cuadro de texto
    // Comentarios :guarda el datos anterior
    override async gotFocus() {
        let m = {}   // inicializamos m
        this.Form.dat_ant = this.prop.Value
    }   // Fin Procedure

    /*
    
        // Evento   :LostFocus
        // Objeto  :im2_doc
        // Tipo   :Cuadro de texto
        // Comentarios :
        async LostFocus() {
            let m = {}   // inicializamos m
            const vi_cap_comedoc = await scatter(['key_pri'], 'vi_cap_comedoc')
            if (this.Form.prop.key == 27 || (vi_cap_comedoc.key_pri && (this.Form.prop.key == 19 || this.Form.prop.key == 15 || this.Form.prop.key == 5))) {
                // si da un esc O flecha hacia atras
                return true
    
            } // End If 
            // si es un documento existente
            if (vi_cap_comedoc.key_pri && !this.prop.ReadOnly) {
                
                this.Form.bt_saveClick()
                return
    
            } // End If 
    
            if ((this.Form.im1_doc.prop.Visible == false || this.Form.im1_doc.prop.ReadOnly == true) && (this.Form.im2_doc.prop.Visible == false || this.Form.im2_doc.prop.ReadOnly == true) && (this.Form.im3_doc.prop.Visible == false || this.Form.im3_doc.prop.ReadOnly == true) && (this.Form.im4_doc.prop.Visible == false || this.Form.im4_doc.prop.ReadOnly == true) && (this.Form.im5_doc.prop.Visible == false || this.Form.im5_doc.prop.ReadOnly == true)) {
                this.Form.im0_doc.prop.Valid = true
                this.Form.im1_doc.prop.Valid = true
                this.Form.im2_doc.prop.Valid = true
                this.Form.im3_doc.prop.Valid = true
                this.Form.im4_doc.prop.Valid = true
                this.Form.im5_doc.prop.Valid = true
                if (!this.Form.bt_saveClick()) {
                    this.prop.Valid = false
                } // End If 
    
                //  thisform.Bt_apl_pag.open
    
            } // End If 
    
        }   // Fin Procedure
    
    */
    // Evento   :When
    // Objeto  :im2_doc
    // Tipo   :Cuadro de texto
    // Comentarios :Se preguntarÃ¡ el impuesto segun el tipo de cliente o proveedor
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