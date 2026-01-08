//////////////////////////////////////////////
// BaseClass : component
// Class : imp_img
// Description : Se imprime imagen del producto
// Author : El Fer Blocks
// Creation : 2024-10-29
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class imp_img extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Con imagen";
    this.prop.Type = "checkBox";
    this.prop.Value = 0;
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }


}
