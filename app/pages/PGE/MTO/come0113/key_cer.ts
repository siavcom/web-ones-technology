//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : editText
// @class : key_cer
// Description : Componente key_cer
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 20/11/2025
// Update Date  :
/////////////////////////////////////////////
// import {editText} from "@/classes/editText";


export class key_cer extends COMPONENT {

    constructor() {
        super();
        this.prop.Caption = "Archivo .key";
        this.prop.BaseClass = "base64";
        this.prop.Visible = false
        //this.prop.ControlSource = "vi_cap_comecer.key_cer";

        this.inputStyle.width = "112px";
        this.inputStyle.accept = ".key" // ".key, .pem, .cer, application/x-pem-file, application/pkix-cert"
        this.prop.Position = 'footer'
        this.prop.Image = "/Iconos/svg/upload.svg"


    }
    override when() {
        return this.Form.pwd_cer.prop.Valid
    }

    override async valid() {
        //  console.log('1) key_cer Value=', this.prop.Value)
        // quitamos la parte izquierda hasta "base64," 
        const b64 = this.prop.Value.split("base64,")[1];
        // console.log('2) key_cer Value=', b64)
        // this.prop.Value = b64

        const pwd_cer = this.Parent.pwd_cer.prop.Value
        const params = ['pkcs8', '-passin', pwd_cer, '-inform', 'DER', '-in', b64]

        const data = await $fetch('/api/SiavcomServer',
            {
                method: 'post',    // Se necesita para que haga la llamada y retorne los datos
                body: {
                    call: 'OpenSSL',
                    params: params

                },

            }
        )
        const res = data
        if (res.success) {
            // console.log('3) key_cer Value=', res.result, 'Recno=', this.Recno)
            await updateCampo(res.result, "vi_cap_comecer.key_cer", this.Parent.cer_cer.Recno)

            this.prop.Value = res.result
            return true
        }

        MessageBox(res.sdterr, 16, 'Error OpenSSL')
        return false
        // const openssl = require('openssl-nodejs')
        /*       debugger
               
               let res = ''
               openssl(`pkcs8`, `-passin`, `pass:`, `${this.Parent.pwd_cer}`, `-inform`, `DER`, `-in`, { buffer: key_cer }, async function (err, buffer) {
                   if (err) {
                       console.error('Error:', err.toString());
                       MessageBox('', 16, 'Datos inválidos')
                       return
                   }
                   res = buffer
               })
               console.log('CFDI firmado buffer=', res.toString());
       
               if (res.length == 0) {
                   MessageBox('', 16, 'Contraseña y/o certificado inválidos')
                   return false
               }
               this.prop.Value = res.toString()
       
               return true
       */
    }

    //metodo
}