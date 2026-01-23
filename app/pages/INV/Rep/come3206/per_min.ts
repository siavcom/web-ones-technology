//////////////////////////////////////////////
// @baseClass  : component
// @class : per_min
// Description : numero de periodo minimos de venta a considerar
// @author: MGSR
// Creation : 2025/01/30
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class per_min extends COMPONENT {
  constructor() {
    super();

    this.prop.Type = "spinner";
    this.prop.Caption = "Periodos minímos de venta";
    this.prop.Value = 1;
    this.prop.Min = 1;
    this.prop.Max = 24;
    this.prop.Visible = false;
    this.prop.Disabled = true;

    this.inputStyle.width = "40px";
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}
