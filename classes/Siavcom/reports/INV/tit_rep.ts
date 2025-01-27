//////////////////////////////////////////////
// BaseClass : component
// Class : num_fam
// Description : numero de familia
// Author : El Fer Blocks
// Creation : 2023-10-11
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class tit_rep extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Titulo del reporte";
    this.prop.Type = "string";
    this.prop.MaxLength = 4096;
    this.prop.Value = " ";
    this.prop.Visible = false;
    this.prop.Disabled = false;
    this.inputStyle.width = "40px";
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
  } //

