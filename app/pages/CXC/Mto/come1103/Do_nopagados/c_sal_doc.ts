//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : textbox
// @class : c_sal_doc
// Description : Componente c_sal_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COLUMN } from "@/classes/Column";

import { COLUMN } from "@/classes/Column";
//imports

export class c_sal_doc extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.BaseClass = 'textLabel';
        this.prop.Type = "number";
        this.prop.ColumnTextLabel = "Saldo";
        this.prop.ControlSource = "vcomesal.pag_doc";
        this.prop.Disabled = true;
        this.prop.Decimals = 2
        this.style.width = '92px';
        //propiedades
    }
    //metodo
}