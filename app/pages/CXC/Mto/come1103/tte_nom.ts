//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : Component
// Class : tte_nom
// Description : Componente tte_nom
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";

//imports

export class tte_nom extends COMPONENT {
    //public
    constructor() {
        super();
        this.prop.Caption = "SAT Tipo de Tercero";

        this.prop.ControlSource = "lla1_pve.tte_pve"; // "TTE_PVE";
        this.style.width = '32px';

        //propiedades
    }


    override async gotFocus() {
        let m = {}   // inicializamos m
        this.prop.MaxLength = len(this.prop.Value)
    }   // Fin Procedure

    override async when() {

        const vi_cap_comenom = await goto(0, 'vi_cap_comeno')
        if (await recNo('lla1_pve') > 0) {
            const lla1_pve = await goto(0, 'lla1_pve')
            if (vi_cap_comenom.rfc_nom == lla1_pve.rfc_pve) {
                this.prop.ReadOnly = true
                return false
            }
        } // End If 
        this.prop.ReadOnly = false
        return true
    }   // Fin Procedure



    //metodo
}