//////////////////////////////////////////////
// BaseClass : component
// Class : per_pry
// Description : Tipos de periodos de los proyectos
// Author : El Fer Blocks
// Creation : 2023-12-08
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class per_pry extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Periodo";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      ["Todos", "Unico", "Mensual", "Semestral", "Anual"],
      ["T", "U", "M", "S", "A"],
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = "?? ";
    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
    this.style.width = "300px";
  }
}
