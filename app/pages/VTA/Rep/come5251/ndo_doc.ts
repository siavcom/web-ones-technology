//////////////////////////////////////////////
// @baseClass  : component
// @class : ndo_doc
// Description : numero de documento
// @author: MGSR
// Creation : 2025/jul/09
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class ndo_doc extends COMPONENT {
  constructor() {
    super();
    this.prop.Caption = "Numero de documento";
    this.prop.Type = "number";
    this.prop.MaxLength = 8;
    this.prop.Value = "0";
    this.prop.Decimals = 0;
    this.style.fontSize = '17px';
    this.inputStyle.fontSize = '17px'
    this.inputStyle.fontWeight = "bold";
    this.inputStyle.width = '64px';


    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}
