//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : textbox
// @class : c_tdo_tdo
// Description : Componente c_tdo_tdo
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COLUMN } from "@/classes/Column";

import { COLUMN } from "@/classes/Column";
//imports

export class c_tdo_tdo extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.BaseClass = 'textLabel';
        this.prop.BaseClass = "textbox";
        this.prop.ColumnTextLabel = "Docto";
        this.prop.ControlSource = "vcomesal.tdo_tdo";
        this.prop.DragIcon = '/Iconos/svg/drag_handle.svg';
        this.prop.DragMode = 1;
        this.prop.Disabled = true
        this.style.width = '40px';
        //propiedades
    }
    //metodo
}