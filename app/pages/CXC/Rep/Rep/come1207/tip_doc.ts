//////////////////////////////////////////////
// @baseClass  : component
// @class : tip_doc
// Description : Tipo de documento cargo o abono
// @author: MGSR
// Creation : 2025-06-10
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
        "Cargos ",
        "Abonos "],
      ["C", "A"]
    ];
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = 'C'
    //this.style.zIndex=2  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }
  override async init() {
    this.Form.cx_tdo_tdo.prop.RowSource =
      `select des_tdo,tdo_tdo,coa_tdo from now.loc_cometdo where coa_tdo='C' and cop_nom='${this.Form.Params[0].replaceAll("´", "")}' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'T' as coa_tdo order by des_tdo`;
    return true;

  }
  async interactiveChange() {
    if (this.prop.Value == "C") {
      this.Form.cx_tdo_tdo.prop.RowSource =
        `select des_tdo,tdo_tdo,coa_tdo from now.loc_cometdo where coa_tdo='C' and cop_nom='${this.Form.Params[0].replaceAll("´", "")}' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'T' as coa_tdo order by des_tdo`;
      return true;
    }
    if (this.prop.Value == "A") {
      this.Form.cx_tdo_tdo.prop.RowSource =
        `select des_tdo,tdo_tdo,coa_tdo from now.loc_cometdo where coa_tdo='A' and cop_nom='${this.Form.Params[0].replaceAll("´", "")}' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'T' as coa_tdo order by des_tdo`;
      return true;
    }
  } //
}

