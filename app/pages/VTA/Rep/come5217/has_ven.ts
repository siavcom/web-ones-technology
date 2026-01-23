//////////////////////////////////////////////
// @baseClass  : component
// @class : has_ven
// Description : Hasta que vendedor
// @author: MGSR
// Creation : 2025/jul/09
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class has_ven extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Hasta  que vendedor";
    this.prop.Type = "string";
    this.prop.MaxLength = 6;
    this.prop.Value = "999999";
    this.prop.ErrorMessage = 'Dato menor al anterior'
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
  override async valid() {
    if (this.prop.Value < this.Parent.des_ven.prop.Value) {
      //await MessageBox('Dato menor al anterior ', 6, 'Error')
      return false
    }
    else
      return true

  }
}
