//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : top_nom
// Description : Componente top_nom
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
//imports

export class top_nom extends COMPONENT {
    //public
    constructor() {
        super();

        this.prop.Caption = "SAT Tipo de Operacion";
        this.prop.ControlSource = "lla1_pve.top_pve";
        this.style.width = '35px';

        //propiedades
    }


    override async when() {
        let m = {}   // inicializamos m
        if (await recNo('lla1_pve') > 0 && vi_cap_comenom.rfc_nom == lla1_pve.rfc_pve) {
            return false

        } // End If 
        return true
    }   // Fin Procedure

    //metodo
}