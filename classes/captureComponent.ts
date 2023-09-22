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
  sw_when:boolean=false
  constructor() {
    super()
    this.prop.ReadOnly = true
    this.prop.ValidOnRead = true
  }

  public async init(): Promise<void> {
    if (this.prop.updateKey == true)
      this.prop.ReadOnly = false
    else
      this.prop.ReadOnly = true

  }

  ////////////////////////////////// 
  // event when 
  ///////////////////////////////////

  async when() {
    if (this.prop.ReadOnly) return false
    if (this.prop.updateKey) // Si es llave de actualizacion
      await this.Form.refreshComponent(false)
    
    return true
  }

  ////////////////////////////////// 
  // event valid 
  ///////////////////////////////////

  async valid() {
    if (this.prop.ReadOnly){
      this.prop.Valid=true
      return this.prop.Valid
    }
    
    if (!this.prop.updateKey || !this.prop.Capture) {
      this.prop.Valid = true
      return this.prop.Valid
    }
    
    if ( !this.sw_when && !await this.Form.validComponent(this.Name) && !this.prop.Valid){
       return this.prop.Valid
    }

    this.prop.Valid=true  
    return this.prop.Valid
  }

}
