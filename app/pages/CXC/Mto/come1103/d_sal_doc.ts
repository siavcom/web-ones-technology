//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : d_sal_doc
// Description : Componente d_sal_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
// import { COMPONENT } from "@/classes/Component";

//imports

export class d_sal_doc extends COMPONENT {
    //public
    constructor() {
        super();
        this.prop.BaseClass = 'textLabel'
        this.prop.Type = 'number';
        this.prop.Caption = "Aplicado";
        this.prop.ControlSource = "vi_cap_comedoc.sal_doc";
        this.inputStyle.width = '125px'
        this.style.fontSize = '17px';

        this.captionStyle.width = '75px';
        this.captionStyle.fontSize = '15px';

        this.prop.Disabled = true;
        this.inputStyle.color = 'black';
        //propiedades
    }

    public override async init() {
        this.prop.Decimals = Public.value.dcp_pge
        this.prop.Value = 0
    }
    //metodo
}