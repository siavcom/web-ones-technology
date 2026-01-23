//////////////////////////////////////////////
// @baseClass  : spinner
// @class : por_dos
// Description : porcentaje de comision para segundo rango de días vencidos
// @author: MGSR
// Creation : 2025-06-18
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class por_dos extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "% comisión ";
    this.prop.Type = "Text";
    this.prop.Value = "90.0"
    this.style.zIndex = 3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
    this.style.maxHeight = "100px";
    this.inputStyle.width = "100px";
    this.style.width = "auto";
    this.prop.Visible = true;
    this.prop.Disabled = false;
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}