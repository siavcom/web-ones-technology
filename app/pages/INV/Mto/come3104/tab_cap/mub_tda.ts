//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : editBox
// @class : mub_tda
// Description : Componente mub_tda
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COLUMN } from "@/classes/Column";
//imports

export class mub_tda extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.ColumnTextLabel = "Control de posiciónes";
        this.prop.Type = 'checkBox';
        this.prop.Caption = "Si";
        this.prop.ControlSource = "vi_cap_tda.mub_tda";
        this.style.width = "64px";

        //propiedades
    }

    // Evento   : When 
    // Comentarios : 
    override async when() {
        this.prop.Valid = true
        this.prop.ReadOnly = ! await this.Parent.alm_tda.prop.Valid
        return true

    }   // Fin Procedure

    //metodo
}