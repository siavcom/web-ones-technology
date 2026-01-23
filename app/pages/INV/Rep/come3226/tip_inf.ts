//////////////////////////////////////////////
// @baseClass  : component
// @class : tip_imp
// Description : Tipo de reporte 
// @author: MGSR
// Creation : 2025/02/07
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class tip_inf extends COMPONENT {
  constructor() {
    super();

    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.Caption = 'Tipo de reporte';
    this.prop.RowSource = [
      [
        "General",
        "Detalle por localización",
        "Detalle por almacén"
      ],
      [1, 2, 3]
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = "1";
  }
  async interactiveChange() {

    if (this.prop.Value == 2) {
      this.Parent.ubi_tda.prop.Visible = true
      this.Parent.ubi_tda.prop.Disabled = false
      this.Parent.alm_rep.prop.Visible = false
      this.Parent.alm_rep.prop.Disabled = true

      return true;
    }

    else {
      this.Parent.ubi_tda.prop.Visible = false
      this.Parent.ubi_tda.prop.Disabled = true
      this.Parent.alm_rep.prop.Visible = true
      this.Parent.alm_rep.prop.Disabled = false
      return true;
    }


  }
}
