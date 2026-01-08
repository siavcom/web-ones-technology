﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editText
// Class : fve_cer
// Description : Componente fve_cer
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 20/11/2025
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";


export class fve_cer extends CAPTURECOMPONENT {

    constructor() {
        super();
        this.prop.Caption = 'Fecha de vencimiento'
        this.prop.Type = "datetime"
        this.prop.ControlSource = "vi_cap_comecer.fve_cer";
        this.prop.Capture = true

    }

}