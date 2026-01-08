//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : Component
// Class : com_doc
// Description : Componente com_doc
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
//imports

export class com_doc extends CAPTURECOMPONENT {
    //public
    constructor() {
        super();
        this.prop.Type = 'number';
        this.prop.ControlSource = "vi_cap_comedoc.com_doc";
        this.prop.ToolTipText = "% de comsion del vendedor";
        this.prop.Caption = "Comisión";
        this.prop.Decimals = 4;
        this.prop.Currency = "%";
        this.prop.Value = '0'
        this.prop.Min = '0'
        this.prop.Max = '99'
        this.inputStyle.width = '64px';
        this.prop.Currency = '%'
        this.style.width = '150px';

        //        this.prop.InputMask = "99.9999";
        //propiedades
    }

    // Evento   :When
    // Objeto  :com_doc
    // Tipo   :Cuadro de texto
    // Comentarios :Es la validación del la comisión del vendedor
    override async when() {

        if (this.Form.ven_ven.prop.Value == 0)
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