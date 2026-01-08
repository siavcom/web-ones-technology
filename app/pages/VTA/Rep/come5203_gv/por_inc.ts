//////////////////////////////////////////////
// BaseClass : spinner
// Class : por_inc
// Description : porcentaje de incremento 
// Author : MGSR
// Creation : 2025-06-30
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class por_inc extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "% de incremento ";
    this.prop.Type = "Text";
    this.prop.Value = "10.00"
    this.style.zIndex = 3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
    this.style.maxHeight = "100px";
    this.inputStyle.width = "100px";
    this.style.width = "auto";
    this.prop.Visible = true;
    this.prop.Disabled = false;

  }
}