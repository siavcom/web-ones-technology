//////////////////////////////////////////////
// @baseClass  : spinner
// @class : dia_cin
// Description : dias vencidos quinto rango
// @author: MGSR
// Creation : 2025-06-18// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class dia_cin extends COMPONENT {
  constructor() {
    super();

    this.prop.Type = "spinner";
    this.prop.Caption = "Días vencidos ";
    this.prop.Value = 35;
    this.prop.Min = 0;
    this.prop.Visible = true;
    this.prop.Disabled = false;

    this.inputStyle.width = "40px";
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}