//////////////////////////////////////////////
// @baseClass  : component
// @class : des_ven
// Description : desde que vendedor
// @author: MGSR
// Creation : 2025/jul/09
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class des_ven extends COMPONENT {
  constructor() {
    super();
    this.prop.Caption = "Desde que vendedor";
    this.prop.Type = "string";
    this.prop.MaxLength = 6;
    this.prop.Value = "0";
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}
