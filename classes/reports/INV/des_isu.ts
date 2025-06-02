//////////////////////////////////////////////
// BaseClass : component
// Class : des_isu
// Description : desde que insumo
// Author : El Fer Blocks
// Creation : 2023-10-11
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class des_isu extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Desde que insumo";
    this.prop.Type = "text";
    this.prop.BaseClass = "editText";
    this.prop.MaxLength = 30;
    this.prop.Value = " ";
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}
