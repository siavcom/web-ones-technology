//////////////////////////////////////////////
// BaseClass : component
// Class : tip_agr
// Description : Tipo de agrupador
// Author : MGSR
// Creation : 2025-06-16
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class tip_agr extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Agrupado por ";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      [
        "Documento y día ",
        "Día y documento ",
        "Total por día"
      ],
      [1, 2, 3]
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = 2
    //this.style.zIndex=2  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }




} //


