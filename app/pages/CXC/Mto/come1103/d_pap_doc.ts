//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : d_pap_doc
// Description : Componente d_pap_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////

export class d_pap_doc extends COMPONENT {
    //public
    constructor() {
        super();
        this.prop.BaseClass = 'textLabel'
        this.prop.Type = 'number';
        this.prop.Caption = "Por Aplicar";
        //        this.prop.Value = 0;

        this.style.fontSize = '17px';
        this.inputStyle.width = '125px'
        this.captionStyle.width = '75px';
        this.captionStyle.fontSize = '15px';
        this.prop.Disabled = true;
        this.inputStyle.color = 'black';
    }

    public override async init() {
        this.prop.Decimals = Public.value.dcp_pge
    }
    //metodo
}