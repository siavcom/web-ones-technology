//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : header
// Class : c_fic_alm
// Description : Componente c_fic_alm
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 03/06/25
// Update Date  :
/////////////////////////////////////////////
// import {header} from "@/classes/header";

import { COLUMN } from "@/classes/Column";
//imports

export class c_fic_alm extends COLUMN {
    //public
    constructor() {
        super();
        this.prop.Type = "number";
        this.prop.ControlSource = "vi_cap_alm.fic_alm";
        this.prop.Decimals = 3
        //this.prop.MaxLength = 6
        this.prop.Min = '0.01'
        this.prop.Max = '300'
        this.prop.Currency = '%';
        this.prop.ColumnTextLabel = "Factor de incremento de compra";
        //propiedades
    }

    override async when() {
        this.prop.Valid = this.Parent.c_alm_tda.prop.Valid
        this.prop.ReadOnly = !this.prop.Valid
        return this.prop.Valid
    }   // Fin Procedure

    //metodo
}