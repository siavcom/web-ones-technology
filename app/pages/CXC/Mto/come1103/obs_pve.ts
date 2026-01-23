//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : obs_pve
// Description : Componente obs_pve
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";

//imports

export class obs_pve extends COMPONENT {
    //public
    constructor() {
        super();
        this.prop.Caption = "Bt_observaciones";
        this.prop.ControlSource = "lla1_pve.obs_pve";
        this.style.width = '346px';

        //propiedades
    }
    override async gotFocus() {
        let m = {}   // inicializamos m
        this.prop.MaxLength = len(this.prop.Value)
    }   // Fin Procedure


    override async when() {
        let m = {}   // inicializamos m
        if (await recNo('lla1_pve') > 0 && vi_cap_comenom.rfc_nom == lla1_pve.rfc_pve) {
            return false

        } // End If 
        return true
    }   // Fin Procedure





    //metodo
}