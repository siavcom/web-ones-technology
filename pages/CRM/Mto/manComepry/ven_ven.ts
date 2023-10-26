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

import { captureComponent } from '@/classes/captureComponent'


export class ven_ven extends captureComponent {


    constructor() {
        super()
   
       // const nom_ind=renglon[i]['nom_ind']
         
        this.prop.textLabel = 'Vendedor'
        this.prop.Type ='number'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_comepry.ven_ven'
        this.prop.Value=0
        this.prop.MaxLength=4
        this.prop.Min="0"
        this.prop.Max="9999"
        this.prop.Capture=true
        this.prop.updateKey=false
        this.prop.componentStyle.width='60px' 
        this.prop.ErrorMessage='No existe'
    }

    ////////////////////////////////// 
    // event valid 
    ///////////////////////////////////
    
    async valid() {
      this.Form.nom_ven.Recno=0
      if (this.prop.Value==0 )
        return true
      
      const ven_ven= this.prop.Value   
      const m={ven_ven}
      
      const data=await this.Form.db.use('lla1_ven',m)
      if (data.length==0) {
          this.prop.Valid=false  
          return false
      }
      this.Form.nom_ven.Recno=data[0].recno
      this.prop.Valid=true
      return true    

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
