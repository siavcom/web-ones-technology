//////////////////////////////////////////////
// @baseClass  : component
// @class : tip_fec
// Description : Fecha para validar el vencimiento
// @author: MGSR
// Creation : 2025-06-09
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class tip_fec extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Por fecha de ";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      [
        "Expedición ",
        "Vencimiento "
      ],
      [1, 2]
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = 2
    //this.style.zIndex=2  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }




} //


