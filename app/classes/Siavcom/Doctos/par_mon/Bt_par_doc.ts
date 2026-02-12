//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : imgButton
// @class : Bt_par_doc
// Description : Componente Bt_par_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { IMGBUTTON } from "@/classes/imgButton";

import { IMGBUTTON } from "@/classes/imgButton";

//imports

export class Bt_par_doc extends IMGBUTTON {

    constructor() {
        super();

        this.prop.Caption = "Paridades";
        this.style.fontSize = '9px';
        this.prop.ToolTipText = "Paridades";
        this.style.width = '80px';
        this.prop.Capture = false
        this.prop.Position = 'main'; // main, header , footer
        //propiedades
    }

    // Evento   :Click
    // Objeto  :paridades
    // Tipo   :Buttom
    // Comentarios :
    override async click() {
        this.prop.Visible = false
        this.Parent.par_mon.open()
    }

    // Evento   :When
    // Objeto  :Paridades
    // Tipo   :Buttom
    override async when() {
        let m = {}   // inicializamos m
        this.prop.Valid = true
        if (await recCount('vi_cap_comepag') <= 1)
            this.prop.ReadOnly = false

        this.prop.ReadOnly = this.prop.ReadOnly ? this.prop.ReadOnly : await !this.Form.rev_per('mon_doc')
        if (this.prop.ReadOnly) {
            this.prop.Valid = true
            this.prop.nextFocus = true
            return false
        } // End If 
        return true
    }   // Fin Procedure

    //metodo
}