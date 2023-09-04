//////////////////////////////////////////////
// BaseClass : component
// Class : captureComponent
// Description : Componete de captura de un Form
// Author : El Fer Blocks
// Creation : 2023-08-31
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class captureComponent extends COMPONENT {

  constructor() {
    super()
    this.prop.ReadOnly=true
   
  }

  public async init(): Promise<void> {
    if (this.prop.updateKey == true)
       this.prop.ReadOnly=false

  }

  ////////////////////////////////// 
  // event when 
  ///////////////////////////////////

  async when() {
    if (this.prop.ReadOnly) return false
    if (this.prop.updateKey){ // Si es llave de actualizacion
      await this.Form.refreshComponent(false)
      }

      return !this.prop.ReadOnly
  }

  ////////////////////////////////// 
  // event valid 
  ///////////////////////////////////

  async valid() {
    if (this.prop.ReadOnly)
      return false

    if (!this.prop.updateKey || !this.prop.Capture){
       this.prop.Valid=true
       return true 
    }
       

    if (!await this.Form.validComponent(this.Name) && !this.prop.Valid)
      return false
    return true
  }

}
