//////////////////////////////////////////////
// BaseClass : component
// Class : has_isu
// Description : Hasta que insumo
// Author : El Fer Blocks
// Creation : 2023-10-11
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class has_isu extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Hasta  que insumo";
    this.prop.Type = "string";
    this.prop.MaxLength = 30;
    this.prop.Value = " ";
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}
