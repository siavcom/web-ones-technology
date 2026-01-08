//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : Component
// Class : iva_pve
// Description : Componente iva_pve
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";

//imports

export class iva_pve extends COMPONENT {
    //public
    constructor() {
        super();
        this.prop.Type = 'number';
        this.prop.Caption = "% de IVA";
        this.prop.ControlSource = "lla1_pve.iva_pve";
        this.prop.Decimals = 3;
        this.prop.InputMask = "99.999";
        this.style.width = '60px';

        //propiedades
    }



    override async gotFocus() {
        let m = {}   // inicializamos m
    }   // Fin Procedure



    override async when() {
        let m = {}   // inicializamos m
        if (await recNo('lla1_pve') > 0 && vi_cap_comenom.rfc_nom == lla1_pve.rfc_pve) {
            return false

        } // End If 
        return true
    }   // Fin Procedure


    //metodo

    //metodo
}