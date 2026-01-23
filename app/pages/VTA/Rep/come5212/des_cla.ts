//////////////////////////////////////////////
// @baseClass  : component
// @class : des_cla
// Description : desde que insumo
// @author: MGSR
// Creation : 2025/jul/09
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class des_cla extends COMPONENT {
  constructor() {
    super();
    this.prop.Caption = "Desde que insumo";
    this.prop.Type = "string";
    this.prop.MaxLength = 30;
    this.prop.Value = " ";
    this.prop.InputMask = Public.value.ima_pge.trim()

    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}
