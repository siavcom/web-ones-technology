//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : for_cal
// Description : Texto para digitar una formula
// Author : MGSR
// Creation : 2025/02/07
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
export class for_cal extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Digite formula "; // Etiqueta que tendra este componente
    this.prop.BaseClass = "string"; // Tipo de componente
    this.prop.RowSourceType = 3; //Tipo de combo Box (Similar a VFP) 1-Value, 2-Alias local SQL ,3-Serv SQL 5-Array
    this.prop.ColumnWidths = "100%"; // Puede ser en puntos 60px,30px
    this.prop.Value = "cst_isu*val_mon";
    this.inputStyle.width = "300px";
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}
