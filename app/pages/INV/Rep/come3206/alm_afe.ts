//////////////////////////////////////////////
// BaseClass : component
// Class : alm_afe
// Description : Almacenes del sistema para afectación puntos de reorden
// Author : MGSR
// Creation : 2025/01/30
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class alm_afe extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Almacen de afectación";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource =
      "select des_tda,alm_tda from man_cometda order by des_tda ";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = "?? ";
    this.style.maxHeight = "200px";
    this.inputStyle.width = "240px";
    this.prop.MultiSelect = false;
    this.style.width = "auto";
    //this.style.zIndex=5  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
}
