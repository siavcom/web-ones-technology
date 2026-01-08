//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : t_textbox
// Class : c_ref_doc
// Description : Componente c_ref_doc
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COLUMN } from "@/classes/Column";

import { COLUMN } from "@/classes/Column";
//imports

export class c_ref_doc extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.ColumnTextLabel = "Referencia";
        this.prop.BaseClass = 'textLabel';
        this.prop.ControlSource = "vi_cap_comepag.ref_doc";
        this.prop.Disabled = true;
        this.style.width = '124px';
        //propiedades
    }


    override async when() {
        let m = {}   // inicializamos m
        this.prop.Valid = true
        return false

    }   // Fin Procedure
    //metodo
}