//////////////////////////////////////////////
// @baseClass  : component
// @class : des_dat
// Description : desde que insumo
// @author: El Fer Blocks
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
    this.prop.Caption = "";
    this.prop.BaseClass = "editText";
    this.prop.MaxLength = 30;
    this.prop.Value = " ";
    this.prop.ErrorMessage = "Un caracter minimo";
    this.style.marginLeft = "10px";
    this.style.width = "fit-content";
    this.inputStyle.width = "140px";
    // this.intputStyle.width = 'auto'
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }

  async valid() {
    if (this.Parent.var_ord.Type == 'text') {
      const Value = this.prop.Value.trim()
      if (Value.length == 0) {
        return false
      }

      if (this.prop.MaxLength - (Value.length) > 0) {
        const ztas = 'z'.repeat(this.prop.MaxLength - (Value.length))
        this.Parent.has_dat.prop.Value = Value + ztas
      }
      else

        this.Parent.has_dat.prop.Value = Value //+ ztas



    }
    return true
  }
}
