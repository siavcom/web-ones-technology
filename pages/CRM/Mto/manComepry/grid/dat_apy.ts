//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : dat_apy
// Description : Datos de la actividad
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class dat_apy extends COLUMN {

    constructor() {
        super()
        this.textLabel = 'Datos' // Column Header
        this.prop.Type ='json'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_comeapy.dat_apy'
        this.prop.MaxLength=128
        this.prop.Capture=true
        this.prop.updateKey=false
   
//        this.prop.componentStyle.width='250px'
        this.style.width='250px'
        ///////////////////////// 
        // Props 
        /////////////////////////

    }
/*
    ////////////////////////////////// 
    // event when 
    ///////////////////////////////////
    
  async when() {
    
    }
*/    
/*
    ////////////////////////////////// 
    // event valid 
    ///////////////////////////////////
    
    async valid() {
        const db = this.Form.db

        const View=db[this.Parent.prop.ControlSource]
        const Value=this.Value
        const Recno=View.Recno
      if (this.prop.updateKey) {
         const data= async db.localSql('select 1 as exists from ${this.Parent.prop.ControlSource} \
                        where recno<>${recno}')
         if (data.exists && data.exist==1){
            MessageBox('Ya existe el campo '+this.prop.Label+' = ',this.prop.Value)
            this.prop.Valid=false
            this.prop.ErrorMessage='Ya existe el campo'
            return false
         }

      }
      this.prop.Valid=true
      return true
    }

*/

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
