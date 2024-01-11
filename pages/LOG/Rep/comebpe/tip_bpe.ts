//////////////////////////////////////////////
// BaseClass : component
// Class : tip_bpe
// Description : Tipo de movimiento (0=Interno, 1=Público)
// Author : MGSR
// Creation : 2024-01-11
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class tip_bpe extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Tipo";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      ["Todos", "Interno", "Público"],
      [9,0,1],
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = 9;
    //this.style.zIndex=5  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
    this.style.width = "300px";
  }
}
