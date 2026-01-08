//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : textbox
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
        this.prop.BaseClass = 'textLabel';
        this.prop.ColumnTextLabel = "Ref.";
        this.prop.Name = "c_ref_doc";
        this.prop.ControlSource = "vcomesal.ref_doc";
        this.style.width = '124px';
        //propiedades
    }
    //metodo
}