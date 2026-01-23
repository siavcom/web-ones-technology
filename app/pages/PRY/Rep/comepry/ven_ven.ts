//////////////////////////////////////////////
// @baseClass  : component
// @class : ven_ven
// Description : Vendedores
// @author: El Fer Blocks
// Creation : 2023-12-08
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class ven_ven extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Vendedor";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource =
      "select nom_ven,ven_ven from man_comeven where isnull(nom_ven,' ')<>' ' union select '  Todos ' as nom_ven,0 as ven_ven order by nom_ven ";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = 0;
    //this.style.zIndex=9  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
    this.style.width = "300px";
  }
}
