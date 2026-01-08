//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : Component
// Class : d_tot_doc
// Description : Componente d_tot_doc
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
//imports

export class d_tot_doc extends COMPONENT {
    //public
    constructor() {
        super();
        this.prop.BaseClass = 'textLabel'
        this.prop.Caption = "Total";
        this.prop.Type = 'number';
        this.prop.Decimals = 5;
        //this.prop.Disabled = false;
        this.prop.InputMask = "###,###,###.#####";

        this.prop.Decimals = 5;
        this.style.width = '256px';
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

}