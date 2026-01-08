//////////////////////////////////////////////
// BaseClass : component
// Class : comboBox
// Description : Tipo de documento de entrada o salida
// Author : El Fer Blocks
// Creation : 2025-01-09
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class tip_doc extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Tipo ";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = [
      [
        "Entradas ",
        "Salidas ",
        "No afecta "
      ],
      ["E", "S", "N"],
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = 'E'
    //this.style.zIndex=2  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }

  async interactiveChange() {
    if (this.prop.Value == "E") {
      this.Parent.in_tdo_tdo.prop.RowSource =
        "select des_tdo,tdo_tdo,inv_tdo from man_cometdo where inv_tdo in ('E') and nmo_tdo >0 union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo";
      return true;
    }
    if (this.prop.Value == "S") {
      this.Parent.in_tdo_tdo.prop.RowSource =
        "select des_tdo,tdo_tdo,inv_tdo from man_cometdo where inv_tdo in ('S') and nmo_tdo >0 union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo";
      return true;
    }
    if (this.prop.Value == "N") {
      this.Parent.in_tdo_tdo.prop.RowSource =
        "select des_tdo,tdo_tdo,inv_tdo from man_cometdo where inv_tdo in ('N') and nmo_tdo >0 union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo";
      return true;
    }

  } //
}

