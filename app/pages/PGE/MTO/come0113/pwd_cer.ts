﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : editText
// @class : pwd_cer
// Description : Componente pwd_cer
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 20/11/2025
// Update Date  :
/////////////////////////////////////////////

export class pwd_cer extends CAPTURECOMPONENT {

    constructor() {
        super();

        this.prop.Caption = 'Confirmacion contraseña';
        this.prop.Type = "password";
        //this.prop.ControlSource = "vi_cap_comecer.pwd_cer";
        this.inputStyle.width = "128px";
        this.prop.ErrorMessage = 'La contraseña no coincide'
    }

    override async valid() {
        this.Form.pem_cer.prop.Visible = false
        this.Form.key_cer.prop.Visible = false

        if (this.prop.Value == '')
            return false
        if (this.prop.Value != this.Form.con_pwd.prop.Value)
            return false

        this.Form.pem_cer.prop.Visible = true
        this.Form.key_cer.prop.Visible = true

        this.Form.pem_cer.prop.Valid = false
        this.Form.key_cer.prop.Valid = false

        this.Form.pem_cer.prop.ReadOnly = false
        this.Form.key_cer.prop.ReadOnly = false


        return true
    }
    //metodo
}