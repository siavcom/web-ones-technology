//////////////////////////////////////////////
// @baseClass  : component
// @class : tip_inv
// Description : Tipo de inventario 
// @author: MGSR
// Creation : 2025/02/07
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class tip_inv extends COMPONENT {
  constructor() {
    super();

    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.Caption = 'Costeo a utilizar';
    var tipinv = "P" //this.Form.publicvar.tii_pge
    if (tipinv == "U")
      tipinv = "UEPS"
    else
      tipinv = "Promedio"

    this.prop.RowSource = [
      [
        "Promedio",
        "Estandar",
        "Reposición",
        "Formula"
      ],
      [1, 2, 3, 4]
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = "1";
  }
  async interactiveChange() {

    if (this.prop.Value == 4) {
      this.Parent.tip_for.prop.Visible = true
      this.Parent.tip_for.prop.Disabled = false

      return true;
    }

    else {
      this.Parent.for_cal.prop.Visible = false
      this.Parent.for_cal.prop.Disabled = true
      this.Parent.tip_for.prop.Visible = false
      this.Parent.tip_for.prop.Disabled = true
      return true;
    }


  }
}
