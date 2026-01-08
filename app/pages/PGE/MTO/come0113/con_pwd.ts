﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editText
// Class : con_pwd
// Description : Componente con_pas
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 20/11/2025
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";

export class con_pwd extends COMPONENT {

    constructor() {
        super();

        this.prop.Caption = 'Contraseña del certificado';
        this.prop.Type = "password";
        this.inputStyle.width = "128px";
        this.prop.ErrorMessage = "Contraseña inválida";
    }
    //metodo

    override async valid() {

        this.Form.pwd_cer.prop.Valid = false
        this.Form.key_cer.prop.ReadOnly = true
        this.Form.key_cer.prop.Valid = false


        if (this.prop.Value == "")
            return false

        // this.prop.Value = this.prop.Value.trim()
        return true
    }

}