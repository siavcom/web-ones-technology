//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : ven_ven
// Description : Vendedor
// Author : El Fer Blocks
// Creation : 2023-07-20
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class ven_ven extends COMPONENT {

    constructor() {
        super()
   
       // const nom_ind=renglon[i]['nom_ind']
         
        this.prop.textLabel = 'Vendedor'
        this.prop.Type ='number'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_comepry.ven_ven'

        this.prop.MaxLength=4
        this.prop.Min="0"
        this.prop.Max="9999"
        this.prop.Decimals=0
        this.prop.Capture=true
        this.prop.updateKey=false

    }

    ////////////////////////////////// 
    // event valid 
    ///////////////////////////////////
    
    async valid() {
      this.prop.Valid=false
      const data=await this.Form.db.execute('select key_pri from man_comeven where ven_ven=${this.prop.Value}')
      if (data[0] && data[0].key_pri && data[0].key_pri>0){
          this.prop.Valid=true
      }
      return this.prop.Valid
    }

    ////////////////////////////////// 
    // event click 
    ///////////////////////////////////
    /*
    async click() {

    }
    */

  //////////////////////////
  // KeyPress
  // Descripcion: Cada tecla que se presiona en el input
  //////////////////////////
  /*
    public keyPress = async ($event) => {
    const key=super.keyPress($event)

   }
  */
}
