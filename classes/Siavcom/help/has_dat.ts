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
  }

  async valid() {

    if (this.Parent.cam_dat.Type == 'string') {
      this.prop.Value = this.prop.Value.trim()

      if (this.prop.MaxLength - (this.prop.Value.length) > 0) {
        const ztas = 'z'.repeat(this.prop.MaxLength - (this.prop.Value.length))
        this.prop.Value = this.prop.Value + ztas
      }
    }
  }
}
