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
  }

  public async init(): Promise<void> {
    if (this.prop.updateKey == true) this.prop.ReadOnly = false;
    else this.prop.ReadOnly = true;
  }

  //////////////////////////////////
  // event when
  ///////////////////////////////////

  override async when() {
    if (this.prop.ReadOnly) return false;
    if (this.prop.updateKey) {
      // Si es llave de actualizacion
      this.Form.bt_graba.prop.Visible = false;
      this.Form.bt_borra.prop.Visible = false;
      await this.Form.refreshComponent();

    }
    return true;
  }

  //////////////////////////////////
  // event valid
  ///////////////////////////////////

  override async valid() {

    if (this.prop.ReadOnly) {
      return true
    }

    if (!this.prop.updateKey || !this.prop.Capture) {
      this.prop.Valid = true;
      return this.prop.Valid;
    }

    this.prop.Valid = await this.Form.validComponent(this.Name);


    return this.prop.Valid;
  }
}
