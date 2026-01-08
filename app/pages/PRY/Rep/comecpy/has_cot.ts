//////////////////////////////////////////////
// BaseClass : component
// Class : des_fam
// Description : Almacenes
// Author : El Fer Blocks
// Creation : 2023-10-11
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class has_cot extends COMPONENT {
  constructor() {
    super();

    this.prop.BaseClass = "editText";
    this.prop.MaxLength = "20px";
    this.prop.Value = " ";
    this.style.marginLeft = "20px";
    // this.style.width = "auto";
    this.inputStyle.width = "150px";

    this.prop.Caption = "Hasta ";
    this.prop.Visible = false;
    this.prop.Disabled = true;

    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}
