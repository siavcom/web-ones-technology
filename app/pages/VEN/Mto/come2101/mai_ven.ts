﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editText
// Class : mai_ven
// Description : Componente mai_ven
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 05/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";


export class mai_ven extends CAPTURECOMPONENT {

    constructor() {
        super();
        this.prop.Caption = 'Mail'
        this.prop.ControlSource = "vi_cap_comeven.mai_ven";
        this.prop.Capture = true
        this.inputStyle.width = '360px'
    }

    override valid() {
        if (this.prop.Value.trim().length == 0)
            return false

        return true
    }

    override click(): Promise<void> {
        console.log('mail click this.Form.bt_save.prop.Visible', this.Form.bt_save.prop.Visible, 'Valid', this.Form.Valid)
    }
    //metodo
}