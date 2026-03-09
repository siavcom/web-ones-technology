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
        this.inputStyle.width = "64px";
        this.inputStyle.accept = ".key" // ".key, .pem, .cer, application/x-pem-file, application/pkix-cert"
        this.prop.Position = 'footer'
        this.prop.Image = "/Iconos/svg/key.svg"
    }

    override when() {
        if (this.Form.pwd_cer.prop.Value.length < 6) {
            return false
        }

        return this.Form.pwd_cer.prop.Valid
    }

    override async valid() {
        // quitamos la parte izquierda hasta "base64," 
        const data = this.prop.Value.split("base64,")[1];
        // this.prop.Value = b64

        console.log('3) key_cer Value=', res.result, 'Recno=', this.Recno)
        await updateCampo(data, "vi_cap_comecer.key_cer", this.Form.Recno)

        this.prop.Value = data
        return true

    }
    //metodo

}