//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : header
// Class : c_dmo_doc
// Description : Componente c_dmo_doc
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COLUMN } from "@/classes/Column";

import { COLUMN } from "@/classes/Column";
//imports

export class c_dmo_doc extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.BaseClass = 'textLabel';
        this.prop.Type = 'text';
        this.prop.ControlSource = "vcomesal.dmo_doc";
        this.style.width = '52px';
        //propiedades
    }
    //metodo
}