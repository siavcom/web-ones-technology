//////////////////////////////////////////////
// BaseClass : component
// Class : ver_cot
// Description : Version de cotizacion
// Author : El Fer Blocks
// Creation : 2024-10-04
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class ver_cot extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Versión de cotización";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      ["Todos", "Ultima", "Numero"],
      ["T", "U", "N"]
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = "T";
    //this.style.zIndex=5  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
    this.style.width = "400px";
    this.prop.Disabled = false;
    this.prop.Visible = true;
  }
  async interactiveChange() {
    if (this.prop.Value != "N") {
      this.Parent.des_cot.prop.Visible = false;
      this.Parent.des_cot.prop.Disabled = true;

      this.Parent.has_cot.prop.Visible = false;
      this.Parent.has_cot.prop.Disabled = true;

    }
    else {
      this.Parent.des_cot.prop.Visible = true;
      this.Parent.des_cot.prop.Disabled = false;

      this.Parent.has_cot.prop.Visible = true;
      this.Parent.has_cot.prop.Disabled = false;
    }
    return;
  }
}

