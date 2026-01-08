﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editText
// Class : cpo_ven
// Description : Componente cpo_ven
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 05/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";


export class cpo_ven extends CAPTURECOMPONENT {

    constructor() {
        super();

        this.prop.Caption = 'Codigo Postal';
        this.prop.ControlSource = "lla1_ven.cpo_ven";
        this.prop.Capture = true
        this.inputStyle.width = "38px";


    }
    //metodo
}