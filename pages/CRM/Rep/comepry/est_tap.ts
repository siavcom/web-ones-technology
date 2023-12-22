//////////////////////////////////////////////
// BaseClass : component
// Class : est_tap
// Description : Estatus de las actividadesS
// Author : El Fer Blocks
// Creation : 2023-12-08
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class est_tap extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Estatus";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      ["Todos", "Inicio", "Bloqueada", "Autorizada", "Cancelada", "Finalizada"],
      ["T", "I", "B", "A", "C", "F"],
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = "?? ";
    //this.style.zIndex=5  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
    this.style.width = "300px";
    this.prop.Disabled = true;
    this.prop.Visible = false;
  }
}
