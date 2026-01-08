﻿//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editText
// Class : pem_cer
// Description : Componente pem_cer
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 20/11/2025
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";


export class pem_cer extends COMPONENT {
    constructor() {
        super();
        this.prop.Caption = 'Archivo .cer '
        this.prop.BaseClass = "base64";
        this.inputStyle.accept = "application/pem"
        //        this.prop.ControlSource = "vi_cap_comecer.pem_cer";
        this.prop.Visible = false
        this.inputStyle.accept = ".cer"
        this.prop.Image = "/Iconos/svg/upload.svg"
        this.prop.Position = 'footer'
    }

    //openssl x509 -in e:\soporte\genracion_pem\19hnos\00001000000407451391.cer -inform DER >e:\soporte\genracion_pem\19hnos\00001000000407451391.pem
    override async valid() {
        const b64 = this.prop.Value.split("base64,")[1];

        const pwd_cer = this.Parent.pwd_cer.prop.Value
        const params = ['x509', '-in', b64, '-inform DER']

        const data = await $fetch('/api/SiavcomServer',
            {
                method: 'post',    // Se necesita para que haga la llamada y retorne los datos
                body: { call: 'OpenSSL', params: params },
            }
        )
        const res = data
        if (res.success) {
            // console.log('3) key_cer Value=', res.result, 'Recno=', this.Recno)
            await updateCampo(res.result, 'vi_cap_comecer.pem_cer', this.Parent.cer_cer.Recno)
            this.prop.Value = res.result
            return true
        }

        MessageBox(res.sdterr, 16, 'Error OpenSSL')
        return false

    }







}