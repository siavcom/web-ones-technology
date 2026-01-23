﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : editText
// @class : rfc_ven
// Description : Componente rfc_ven
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 05/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";


export class rfc_ven extends CAPTURECOMPONENT {

    constructor() {
        super();
        this.prop.Caption = "RFC";
        this.prop.ControlSource = "vi_cap_comeven.rfc_ven";
        this.prop.Capture = true
        this.inputStyle.width = "112px";

    }
    //metodo
}