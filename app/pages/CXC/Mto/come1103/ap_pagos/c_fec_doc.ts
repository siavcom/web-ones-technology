//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : header
// Class : c_fec_doc
// Description : Componente c_fec_doc
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COLUMN } from "@/classes/Column";

import { COLUMN } from "@/classes/Column";
//imports

export class c_fec_doc extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.Type = 'date';
        this.prop.BaseClass = 'textLabel';
        this.prop.ControlSource = "vi_cap_comepag.fec_doc";

        this.prop.ColumnTextLabel = "Expedida";
        this.style.width = '92px';

        //propiedades
    }
    //metodo
}