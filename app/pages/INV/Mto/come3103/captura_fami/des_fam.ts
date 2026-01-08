//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editBox
// Class : des_tti
// Description : Componente des_tti
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COLUMN } from "@/classes/Column";
//imports

export class des_fam extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.ColumnTextLabel = "Descripción";
        this.prop.ControlSource = "vi_cap_fam.des_fam";
        this.prop.InputMask = "XXXXXXXXXXXXXXXXXXXX";
        this.style.width = "192px";

        //propiedades
    }
    override async when() {
        this.prop.ReadOnly = !this.Parent.cla_fam.prop.Valid
        return !this.prop.ReadOnly
    }

    //metodo
}