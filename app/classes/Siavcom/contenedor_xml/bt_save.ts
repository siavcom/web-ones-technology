//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : json
// @class : dat_xml
// Description : Componente tab_xml
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 21/08/25
// Update Date  : 
/////////////////////////////////////////////

import { IMGBUTTON } from "@/classes/imgButton";

export class bt_save extends IMGBUTTON {
    constructor() {
        super()
        this.prop.Image = "/Iconos/svg/accept.svg"; //bx-calendar.svg"
        this.style.width = "35px";
        this.style.float = "right"
        this.prop.Visible = false
        /*
              this.prop.Caption = 'Graba' // Column Header
              this.style.width = '50px'
              this.prop.Image = "/Iconos/svg/save-color1.svg"
        
        */
    }

    async click(): Promise<void> {
        this.prop.Visible = false
        await this.Parent.graba_xml()
        MessageBox('', 0)
        this.Form.block[5].prop.Visible = false
    }

}
