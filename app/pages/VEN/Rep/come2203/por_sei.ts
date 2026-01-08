//////////////////////////////////////////////
// BaseClass : spinner
// Class : por_sei
// Description : porcentaje de comision para sexto rango de días vencidos
// Author : MGSR
// Creation : 2025-06-18

// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class por_sei extends COMPONENT {
  constructor() {
    super();
    this.prop.Caption = "% comisión ";
    this.prop.Type = "Text";
    this.prop.Value = "50.0"
    this.style.zIndex = 3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
    this.style.maxHeight = "100px";
    this.inputStyle.width = "100px";
    this.style.width = "auto";
    this.prop.Visible = true;
    this.prop.Disabled = false;

    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}