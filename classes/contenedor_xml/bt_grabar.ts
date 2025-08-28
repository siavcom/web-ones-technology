//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : json
// Class : dat_xml
// Description : Componente tab_xml
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 21/08/25
// Update Date  : 
/////////////////////////////////////////////

import { IMGBUTTON } from "@/classes/imgButton";

export class bt_saver extends IMGBUTTON {
    constructor() {
        super()
        this.prop.Caption = 'Graba' // Column Header
        this.style.width = '40px'
    }

    async click(): Promise<void> {
        await this.Parent.graba_xml(this.Parent.nom_tab, this.Parent.key_xmd)
    }


}
