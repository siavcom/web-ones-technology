﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editText
// Class : dir_ven
// Description : Componente dir_ven
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 05/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";


export class dir_ven extends CAPTURECOMPONENT {

    constructor() {
        super();
        this.prop.Caption = 'Dirección'
        this.prop.ControlSource = "vi_cap_comeven.dir_ven";
        this.prop.Capture = true
        this.inputStyle.width = "600px"


    }


}