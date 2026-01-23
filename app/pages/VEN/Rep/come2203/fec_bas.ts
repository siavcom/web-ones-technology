//////////////////////////////////////////////
// @baseClass  : component
// @class : comboBox
// Description : Fecha base 
// @author: MGSR
// Creation : 2025-05-15
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class fec_bas extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Fecha base ";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      [
        "Fecha de facturación ",
        "Fecha de vencimiento "
      ],
      [1, 2]
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = 1
    //this.style.zIndex=2  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }




} //


