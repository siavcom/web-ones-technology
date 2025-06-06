//////////////////////////////////////////////
// BaseClass : component
// Class : des_fam
// Description : Almacenes
// Author : El Fer Blocks
// Creation : 2023-10-11
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class op_des_fam extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Desde que familia";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 4; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.ColumnCount = 3;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "50%,30%,20%"; // Puede ser en puntos 60px,30px /
    this.prop.Visible = false;
    this.prop.Disabled = true;

    //this.style.zIndex=3  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
  //////////////////////////////////
  // event when
  ///////////////////////////////////

  //   await super.when() no hace falta el super porque en focus.capture lo hace

  async interactiveChange() {

    this.Parent.op_has_fam.prop.Value = this.prop.Value;
    return true;
  }

}