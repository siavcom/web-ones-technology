//////////////////////////////////////////////
// BaseClass : component
// Class : des_dat
// Description : desde que insumo
// Author : El Fer Blocks
// Creation : 2024-06-07
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
    this.prop.ErrorMessage = "Un caracter minimo";
    this.style.marginLeft = "22px";
    this.inputStyle.fontSize = "17px";
    this.inputStyle.fontWeight = "bold";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";

    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }

  async valid() {
    this.prop.Valid = true
    if (this.Parent.cam_dat.Type == 'string') {
      const Value = this.prop.Value.trim()
      if (Value.length == 0) {
        this.prop.Valid = false
        return false
      }
      console.log('des_dat Value=', Value, this.prop.MaxLength, Value.length)
      if (this.prop.MaxLength - (Value.length) > 0) {
        const ztas = 'z'.repeat(this.prop.MaxLength - (Value.length))
        this.Parent.has_dat.prop.Value = Value + ztas
      }
      else

        this.Parent.has_dat.prop.Value = Value //+ ztas






      //      if (this.prop.MaxLength - (this.prop.Value.length) > 0) {
      //       const ztas = 'z'.repeat(this.prop.MaxLength - (this.prop.Value.length))
      //      }
    }
    return true
  }
}
