//////////////////////////////////////////////
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
        this.prop.Caption = 'Archivo CER '
        this.prop.BaseClass = "base64";
        this.inputStyle.accept = "application/pem"
        //        this.prop.ControlSource = "vi_cap_comecer.pem_cer";
        this.prop.Visible = false
        this.inputStyle.accept = ".cer"
        this.inputStyle.width = "80px"
        this.prop.Image = "/Iconos/svg/certificate.svg"
        this.prop.Position = 'footer'
    }

    override async valid() {
        const b64 = this.prop.Value.split("base64,")[1];

        //const pwd_cer = this.Parent.pwd_cer.prop.Value
        const params = ['x509', '-in', b64, '-inform DER']

        const data = await $fetch('/api/SiavcomServer',
            {
                method: 'post',    // Se necesita para que haga la llamada y retorne los datos
                body: { call: 'OpenSSL', params: params },
            }
        )
        const res = data
        if (res.success) {

            const m = await currentValue('recno', 'vi_cap_comecer')
            let pem_cer = res.result.replace('-----BEGIN CERTIFICATE-----', '')
            pem_cer = pem_cer.replace('-----END CERTIFICATE-----', '')

            //  console.log('3) key_cer Value=', pem_cer, 'Recno=', m.recno)
            await updateCampo(pem_cer, 'vi_cap_comecer.pem_cer', m.recno)
            this.prop.Value = pem_cer
            if (this.Form.key_cer.prop.Valid)
                this.Form.bt_save.prop.Visible = true

            return true
        }

        MessageBox(res.sdterr, 16, 'Error ')
        return false

    }
}