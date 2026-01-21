﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editText
// Class : tel_ven
// Description : Componente tel_ven
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 05/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";


export class tel_ven extends CAPTURECOMPONENT {

    constructor() {
        super();
        this.prop.Caption = 'Teléfono ';
        this.prop.ControlSource = "vi_cap_comeven.tel_ven";
        this.prop.Capture = true
        this.inputStyle.width = "200px";
    }


    //metodo
}