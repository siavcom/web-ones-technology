﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editText
// Class : col_ven
// Description : Componente col_ven
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 05/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";


export class col_ven extends CAPTURECOMPONENT {

    constructor() {
        super();
        this.prop.Caption = 'Colonia'
        this.prop.ControlSource = "lla1_ven.col_ven";
        this.prop.Capture = true
        this.inputStyle.width = "512px";

    }

}