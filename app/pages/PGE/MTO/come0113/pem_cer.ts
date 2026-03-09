﻿/**
 * This Form was generated automatically for web-ones-technology
 * @baseClass  : editText
 * @class : pem_cer
 * @description : Componente pem_cer
 * @author: El Fer Blocks (Fernando Cuadras)
 * @creation : 20/11/2025
 * @updateDate  :
 */

export class pem_cer extends COMPONENT {
    constructor() {
        super();
        this.prop.Caption = 'Archivo .cer '
        this.prop.BaseClass = "base64";
        this.inputStyle.accept = "application/pem"
        //        this.prop.ControlSource = "vi_cap_comecer.pem_cer";
        this.prop.Visible = false
        this.inputStyle.accept = ".cer"
        this.inputStyle.width = "80px"
        this.prop.Image = "/Iconos/svg/certificate.svg"
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
            await updateCampo(res.result, 'vi_cap_comecer.pem_cer', this.Form.Recno)
            this.prop.Value = res.result
            return true
        }

        MessageBox(res.sdterr, 16, 'Error OpenSSL')
        return false

    }







}