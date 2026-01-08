//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editBox
// Class : num_fam
// Description : Componente num_fam
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COMPONENT } from "@/classes/Component";
//imports

export class num_fam extends COMPONENT {
    //public
    constructor() {
        super();
        this.prop.BaseClass = "editBox";
        this.prop.Caption = "Segmento de familia";
        this.prop.Type = 'spinner';
        this.prop.Name = "num_fam";
        this.prop.Value = 1
        //propiedades
    }

    // Evento   :GotFocus 
    // Objeto  :num_fam 
    // Comentarios : 
    override async when() {
        this.Form.captura_fami.prop.RecordSource = ''
        this.Form.bt_aceptar.prop.Visible = true
        return true
    }   // Fin Procedure

    override async click() {
        this.Form.captura_fami.prop.RecordSource = ''
        this.Form.bt_aceptar.prop.Visible = true
    }

    //metodo
}