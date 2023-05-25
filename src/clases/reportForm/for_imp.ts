//////////////////////////////////////////////
// BaseClass : component
// Class : for_imp
// Description : formsto de impresion a utilizar en el reporte
// Author : El Fer Blocks
// Creation : 2023-25-5
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class for_imp extends COMPONENT {

    constructor() {
        super()
        this.prop.textLabel = 'Forma de impresión'
        this.prop.Type ='text'
        this.prop.BaseClass = 'editText'
        this.prop.Value=this.prop.Name
        this.prop.MaxLength=64
    }

    ////////////////////////////////// 
    // event when 
    ///////////////////////////////////
    
  async when() {
        return !this.prop.ReadOnly
        //   await super.when() no hace falta el super porque en focus.capture lo hace 
    }
    

    ////////////////////////////////// 
    // event valid 
    ///////////////////////////////////
    
    async valid() {
      return true
    }

}
