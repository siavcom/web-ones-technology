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

export class d_tot_doc extends COMPONENT {
    //public

    //this.Form.d_tot_doc.prop.Value = vi_cap_comedoc.imp_doc + vi_cap_comedoc.im0_doc + vi_cap_comedoc.im1_doc + vi_cap_comedoc.im2_doc + vi_cap_comedoc.im3_doc + vi_cap_comedoc.im4_doc + vi_cap_comedoc.im5_doc
    /*
      imp_doc = ref(0)
  
      calculo = computed(() => {
          console.log('1) COMPUTED ThisForm=', this.imp_doc.value)
          // const data = await currentValue('*', 'vi_lla1_doc')
          // return data?.imp_doc + data?.im0_doc + data?.im1_doc + data?.im2_doc + data?.im3_doc + data?.im4_doc + data?.im5_doc
          if (ThisForm.value == null) {
              return 0
          }
          //const thisForm = ThisForm.value
  
          return this.imp_doc.value + this.Form.im0_doc.prop.Value + this.Form.im1_doc.prop.Value + this.Form.im2_doc.prop.Value + this.Form.im3_doc.prop.Value + this.Form.im4_doc.prop.Value + this.Form.im5_doc.prop.Value
  
      })
  
      private unWatch = watch(total, (newData) => {
          console.log('newData=', newData)
      },
          { deep: true })
  
  */
    constructor() {
        super();
        this.prop.BaseClass = 'textLabel'
        this.prop.Caption = "Total";
        this.prop.Type = 'number';
        this.style.width = '256px';
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

}