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

import { COMPONENT } from "@/classes/Component";

export class CAPTURECOMPONENT extends COMPONENT {
  // sw_when:boolean=false
  constructor() {
    super();
    this.prop.ReadOnly = true;
    this.prop.ValidOnRead = true;
    this.prop.Capture = true
    this.prop.Valid = false
    this.prop.updateKey = false
  }

  public async init(): Promise<void> {
    if (this.prop.updateKey == true) this.prop.ReadOnly = false;
    else this.prop.ReadOnly = true;
  }

  async beforeWhen() {
    if (!this.prop.updateKey)
      return
    await this.Form.beforeWhenComponent(ref(this))
  }

  override async when() {
    this.prop.Status = 'A'

    if (this.prop.updateKey)
      this.Recno = 0
    return true
  }

  //////////////////////////////////
  // event valid
  ///////////////////////////////////

  override async valid() {

    if (this.prop.ReadOnly) {
      return true
    }

    if (!this.prop.updateKey && !this.prop.Capture) {
      this.prop.Valid = true;
      return this.prop.Valid;
    }

    this.prop.Valid = await this.Form.validComponent(ref(this));
    /*   Se puso en elCapture form con el NextTick
        if (this.prop.updateKey) {
    
          for (const comp of this.Form.main) {// Apaga validaciones 
              this.Form[comp].prop.Valid = this.Form[comp].prop.Capture && !this.Form[comp].prop.updateKey ? false : this.Form[comp].prop.Valid
          }
        }
    */
    return this.prop.Valid;
  }
}
