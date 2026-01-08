//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editBox
// Class : esw_fam
// Description : Componente esw_fam
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COLUMN } from "@/classes/Column";
//imports

export class esw_fam extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.ColumnTextLabel = "Estatus Web";
        this.prop.Type = 'checkBox';
        this.prop.Caption = "Si";
        this.prop.ControlSource = "vi_cap_fam.esw_fam";
        this.prop.Name = "esw_fam";

        //propiedades
    }
    override async when() {
        this.prop.ReadOnly = !this.Parent.cla_fam.prop.Valid
        return !this.prop.ReadOnly
    }

    //metodo
}