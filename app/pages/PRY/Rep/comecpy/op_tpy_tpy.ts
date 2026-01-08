//////////////////////////////////////////////
// BaseClass : component
// Class : tpy_tpy
// Description : Tipo de proyectos
// Author : El Fer Blocks
// Creation : 2023-12-08
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class op_tpy_tpy extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Tipo de proyectos";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource =
      "select des_tpy,tpy_tpy from man_cometpy  union select '  Todos ' as des_tpy,'?? ' as tpy_tpy order by des_tpy ";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = "?? ";
    this.style.width = "300px";
    //this.style.zIndex=5  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }


} //
