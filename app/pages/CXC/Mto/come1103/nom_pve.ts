//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : nom_pve
// Description : Componente nom_pve
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";

//imports

export class nom_pve extends COMPONENT {
    //public
    constructor() {
        super();

        this.prop.Type = 'text';
        this.prop.ControlSource = "lla1_pve.nom_pve";
        this.style.DisabledBackColor = 'rgb(234, 234, 234)'
        this.prop.ReadOnly = false;
        this.style.width = '200px';

        //propiedades
    }

    override async gotFocus() {

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