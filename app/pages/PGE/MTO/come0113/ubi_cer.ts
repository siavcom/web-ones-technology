﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : editText
// @class : ubi_cer
// Description : Componente ubi_cer
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 20/11/2025
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";


export class ubi_cer extends CAPTURECOMPONENT {

    constructor() {
        super();
        this.prop.Caption = 'Ubicación del certificado'
        this.prop.ControlSource = "vi_cap_comecer.ubi_cer";
        this.prop.Capture = true
        this.inputStyle.width = "512px";

    }

}