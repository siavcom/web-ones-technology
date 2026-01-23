//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : header
// @class : c_fve_doc
// Description : Componente c_fve_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COLUMN } from "@/classes/Column";

import { COLUMN } from "@/classes/Column";
//imports

export class c_fve_doc extends COLUMN {
    //public
    constructor() {
        super();

        this.prop.Type = 'date';
        this.prop.BaseClass = 'textLabel';
        this.prop.ControlSource = "vi_cap_comepag.fve_doc";

        this.prop.ColumnTextLabel = "Vence";
        this.style.width = '92px';

        //propiedades
    }

    //metodo
}