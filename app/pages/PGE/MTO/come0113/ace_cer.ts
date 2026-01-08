﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editText
// Class : ace_cer
// Description : Componente ace_cer
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 20/11/2025
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";


export class ace_cer extends CAPTURECOMPONENT {

    constructor() {
        super();
        this.prop.Caption = "Archivo .cer";
        this.prop.Type = "base64"
        this.prop.ControlSource = "vi_cap_comecer.ace_cer";
        this.prop.Capture = true
        this.inputStyle.width = "112px";
        this.inputStyle.accept = "application/cer"

    }
    //metodo
}