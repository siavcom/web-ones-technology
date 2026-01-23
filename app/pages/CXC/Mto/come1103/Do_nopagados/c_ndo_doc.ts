//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : textbox
// @class : c_ndo_doc
// Description : Componente c_ndo_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COLUMN } from "@/classes/Column";

import { COLUMN } from "@/classes/Column";
//imports

export class c_ndo_doc extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.BaseClass = 'textLabel';
        this.prop.Type = "number";
        this.prop.ColumnTextLabel = "Número";
        this.prop.ControlSource = "vcomesal.ndo_doc";
        this.prop.Decimals = 0
        this.style.width = '66px';

        //propiedades
    }
    //metodo
}

