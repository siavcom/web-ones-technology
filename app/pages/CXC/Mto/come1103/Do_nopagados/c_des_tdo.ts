//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : header
// Class : c_des_tdo
// Description : Componente c_des_tdo
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COLUMN } from "@/classes/Column";

import { COLUMN } from "@/classes/Column";
//imports

export class c_des_tdo extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.BaseClass = 'textLabel';
        this.prop.Type = 'text';
        this.prop.ControlSource = "vcomesal.des_tdo";
        this.prop.ColumnTextLabel = "";
        this.style.width = '128px';
        //propiedades
    }
    //metodo
}