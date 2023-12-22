//////////////////////////////////////////////
// BaseClass : component
// Class : equ_equ
// Description : Equipos de trabajo
// Author : El Fer Blocks
// Creation : 2023-12-08
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class equ_equ extends COMPONENT {
  constructor() {
    super();

    this.prop.textLabel = "Equipo de trabajo";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = " select '  Todos ' as des_equ,'?? ' as equ_equ  ";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = "?? ";
    //this.style.zIndex=5  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
    this.style.width = "300px";
  }
}
