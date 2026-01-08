//////////////////////////////////////////////
// BaseClass : component
// Class : tip_cat
// Description : Tipo de catalogo
// Author : El Fer Blocks
// Creation : 2024/10/30
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class tip_cat extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Tipo de catálogo";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [["General", "Detallado", "Solo datos SAT"], [1, 2, 3]];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    //this.prop.Value=1
    //this.style.zIndex=2  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
  async interactiveChange() {
    if (this.prop.Value == 1) {
      this.Parent.imp_img.prop.Visible = true;
      this.Parent.imp_img.prop.Disabled = false;

    }
    else {
      this.Parent.imp_img.prop.Visible = false;
      this.Parent.imp_img.prop.Disabled = true;
    }
    return;
  } //
}
