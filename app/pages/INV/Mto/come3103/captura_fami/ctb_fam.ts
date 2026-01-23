//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : editBox
// @class : ctb_fam
// Description : Componente ctb_fam
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COLUMN } from "@/classes/Column";
//imports

export class ctb_fam extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.BaseClass = "editBox";
        this.prop.ColumnTextLabel = "Cuenta contable";
        this.prop.ControlSource = "vi_cap_fam.ctb_fam";
        this.prop.Format = "";
        this.prop.Name = "ctb_fam";
        //propiedades
    }

    override async when() {
        this.prop.ReadOnly = !this.Parent.cla_fam.prop.Valid
        return !this.prop.ReadOnly
    }
    //metodo
}