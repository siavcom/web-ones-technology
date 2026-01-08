//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : t_textbox
// Class : c_sal_doc
// Description : Componente c_sal_doc
// Author : El Fer Blocks (Fernando Cuadras)
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
        this.prop.Type = "number";
        this.prop.BaseClass = 'textLabel';
        this.prop.ColumnTextLabel = "Saldo";
        this.prop.ControlSource = "vi_cap_comepag.sal_doc";
        this.prop.InputMask = "99,999,999.99999";
        this.style.width = '92px';

        //propiedades
    }

    override async init() {
        this.prop.Decimals = Public.value.dcp_pge
    }
    //metodo
}