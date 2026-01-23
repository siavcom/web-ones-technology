//////////////////////////////////////////////
// @baseClass  : component
// @class : tip_ana
// Description : Tipo de análisis
// @author: MGSR
// Creation : 2025/03/07
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class tip_ana extends COMPONENT {
  constructor() {
    super();

    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.Caption = 'Análisis sobre ';
    this.prop.RowSource = [
      [
        "Ganancia", "Costo", "Venta"],
      [1, 2, 3]
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = "1";
  }

}
