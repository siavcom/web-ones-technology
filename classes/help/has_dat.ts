//////////////////////////////////////////////
// BaseClass : component
// Class : has_dat
// Description : Hasta que dato
// Author : El Fer Blocks
// Creation : 2023-10-11
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class has_dat extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = " Y ";
    this.prop.MaxLength = 30;
    this.prop.Visible = false;
  }

  async valid() {

    if (this.Parent.cam_dat.Type == 'string') {
      const Value = this.prop.Value.trim()
      if (this.prop.MaxLength - (Value.length) > 0) {
        const ztas = 'z'.repeat(this.prop.MaxLength - (Value.length))
        this.prop.Value = Value + ztas
      }
    }
    return true
  }
}
