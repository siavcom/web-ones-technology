//////////////////////////////////////////////
// BaseClass : component
// Class : des_dat
// Description : desde que insumo
// Author : El Fer Blocks
// Creation : 2023-10-11
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class des_dat extends COMPONENT {
  constructor() {
    super();
    this.prop.BaseClass = "editText";
    this.prop.MaxLength = 30;
    this.prop.Value = " ";
    this.prop.ErrorMessage = "Minimo tres caracteres";
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }

  async valid() {
    if (this.Parent.cam_dat.Type == 'string') {
      this.prop.Value = this.prop.Value.trim()
      if (this.prop.Value.length < 2)
        return false

      if (this.prop.MaxLength - (this.prop.Value.length) > 0) {
        const ztas = 'z'.repeat(this.prop.MaxLength - (this.prop.Value.length))
        this.Parent.has_dat.prop.Value = this.prop.Value + ztas
      }
    }
  }
}
