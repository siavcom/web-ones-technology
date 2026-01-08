//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : header
// Class : c_fve_doc
// Description : Componente c_fve_doc
// Author : El Fer Blocks (Fernando Cuadras)
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
        // this.prop.Name = "c_fve_doc";
        this.prop.BaseClass = 'textLabel';
        this.prop.Type = 'date';
        this.prop.ControlSource = "vcomesal.fve_doc";
        this.prop.ColumnTextLabel = "Vence";
        this.style.width = '92px';

        //propiedades
    }
    //metodo
}