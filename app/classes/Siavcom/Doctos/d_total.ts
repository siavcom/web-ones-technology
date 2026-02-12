//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Component
// @class : d_tot_doc
// Description : Componente d_tot_doc
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 24/07/25
// Update Date  :
/////////////////////////////////////////////
//imports

// let ThisForm = ref(null)
//let total = ref({ imp_doc: 0, im0_doc: 0, im1_doc: 0, im2_doc: 0, im3_doc: 0, im4_doc: 0, im5_doc: 0 })

export class d_total extends COMPONENT {

    constructor() {
        super();
        this.prop.BaseClass = 'textLabel'
        this.prop.Type = 'number';
        this.style.width = '0px';
        this.style.height = '0px';
        // this.imp_doc = this.Form.imp_doc.prop.Value
        //propiedades
    }

    public override async init() {

        this.prop.Decimals = Public.value.dcp_pge
    }

    /*
        override onUnmounted(): void {
            if (this.unWatch) {
                this.unWatch();
            }
        }
    */


}