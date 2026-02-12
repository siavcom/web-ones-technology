//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : d_sal_cta
// Description : Componente d_sal_cta
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";

//imports

export class d_sal_cta extends COMPONENT {
    //public
    constructor() {
        super();
        this.prop.Caption = "Saldo ";
        this.prop.BaseClass = 'textLabel'
        this.prop.Type = 'number';
        this.prop.Decimals = 2;

        this.inputStyle.width = '128px';
        this.prop.Disabled = true;
        this.inputStyle.color = 'black';

        //propiedades
    }

    override async interactiveChange() {
        let m = {}   // inicializamos m
        if (this.prop.Value <= 0) {
            this.DisabledBackColor = 'rgb(255, 0, 0)'
        } else {

            this.DisabledBackColor = 'rgb(128, 255, 255)'
        } // End If 

    }   // Fin Procedure


    //metodo
}