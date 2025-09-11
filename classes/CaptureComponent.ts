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
    if (this.prop.updateKey == true)
      this.prop.ReadOnly = false;
    else
      this.prop.ReadOnly = true;


  }

  async beforeWhen() {
    if (!this.prop.updateKey) // || !this.prop.First
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
  // Solo os campos updateKey
  ///////////////////////////////////
  override async valid() {

    if (this.prop.ReadOnly || !this.prop.updateKey || !this.prop.Capture) {
      console.log('bt_save Visible=', this.Form.bt_save.prop.Visible)
      return true
    }

    this.prop.Valid = await this.Form.validKeyComponent(ref(this));

    return this.prop.Valid;
  }
}
