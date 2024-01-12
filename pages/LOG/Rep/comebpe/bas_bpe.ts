//////////////////////////////////////////////
// BaseClass : component
// Class : bas_bpe
// Description : bascula
// Author : MGSR
// Creation : 2024-01-11
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class bas_bpe extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Bascula";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = " select '  Todos ' as des_bas,'T' as bas_bpe  ";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = "T";
    //this.style.zIndex=5  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
    this.style.width = "200px";
    this.prop.componentStyle.width = "100px";
  }
}
