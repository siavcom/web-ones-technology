//////////////////////////////////////////////
// BaseClass : component
// Class : sep_fam
// Description : Se separa por familias
// Author : El Fer Blocks
// Creation : 2023-10-11
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class con_con extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Con consignatario";
    this.prop.Type = "checkBox";
    this.prop.Value = 0;
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}
