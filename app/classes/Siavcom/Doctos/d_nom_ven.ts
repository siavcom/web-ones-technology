//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : d_nom_ven
// Description : Componente d_nom_ven
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";
//imports

export class d_nom_ven extends COMPONENT {
    //public
    constructor() {
        super();


        this.prop.Type = 'text';
        this.prop.BaseClass = 'textLabel'
        this.prop.ControlSource = "vi_cap_comedoc.nom_ven";
        this.inputStyle.width = '290px';

        this.prop.Disabled = true;
        this.inputStyle.color = 'black';


        //propiedades
    }
    //metodo
}