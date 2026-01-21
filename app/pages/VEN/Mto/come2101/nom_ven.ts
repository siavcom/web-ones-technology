﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editText
// Class : nom_ven
// Description : Componente nom_ven
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 05/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";


export class nom_ven extends CAPTURECOMPONENT {

    constructor() {
        super();
        this.prop.Caption = 'Nombre'
        this.prop.ControlSource = "vi_cap_comeven.nom_ven";
        this.prop.Capture = true
        this.inputStyle.width = "400px";
        this.prop.ErrorMessage = 'Nombre no válido'
    }


    override async valid() {
        if (this.prop.Value.trim() == '') {
            console.log('nom_ven valid false', this.prop.Value.trim())
            return false
        }


        return true

    }
    //metodo
}