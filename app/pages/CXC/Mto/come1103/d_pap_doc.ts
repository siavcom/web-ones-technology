//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : d_pap_doc
// Description : Componente d_pap_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";

//imports

export class d_pap_doc extends COMPONENT {
    //public
    constructor() {
        super();
        this.prop.BaseClass = 'textLabel'
        this.prop.Type = 'number';
        this.prop.Decimals = 5;
        this.prop.Caption = "Por Aplicar";
        this.prop.Decimals = 5;
        this.prop.Value = 0;

        this.inputStyle.width = '125px'
        this.style.fontSize = '17px';

        this.captionStyle.width = '75px';
        this.captionStyle.fontSize = '15px';


        //propiedades
    }

    public override async init() {
        this.prop.Decimals = Public.value.dcp_pge
    }
    //metodo
}