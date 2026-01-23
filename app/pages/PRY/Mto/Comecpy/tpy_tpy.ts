//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : component
// @class : tpy_tpy
// Description : Tipo
// @author: El Fer Blocks
// Creation : 2023-07-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";

export class tpy_tpy extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Tipo";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 2;
    this.prop.ColumnCount = 3;
    this.prop.BoundColumn = 2;
    this.prop.First = true

    this.inputStyle.fontSize = "17px";
    // this.inputStyle.height = '20px'
    this.inputStyle.fontWeight = "bold";
    this.inputStyle.width = "300px";
    this.style.width = "500px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
  }
  override async init() {
    const data = await SQLExec(
      "select * from vi_cap_cometpy_ctz where cop_nom='C' \
       and exists (select tap.key_pri from man_cometap tap \
        join man_cometac tac on tac.tap_tap=tap.tap_tap \
        where tpy_tpy=vi_cap_cometpy_ctz.tpy_tpy ) \
          order by cop_nom,tpy_tpy", "cometpy");

    this.prop.RowSource = "cometpy.des_tpy,tpy_tpy,cop_nom";
    this.prop.ReadOnly = false;


  }

  async when() {
    this.Form.ver_cpy.prop.Disabled = true
    this.Form.bt_cotizacion.prop.Visible = false
    this.Form.bt_clonar.prop.Visible = false
    this.Form.bt_pdf.prop.Visible = false
    this.Form.displayPdf.prop.Source = ''
    this.Form.displayPdf.prop.Visible = false

    this.Form.grid_comecpy.prop.RecordSource = "";
    this.Form.num_pry.prop.Valid = false;
    this.Form.Recno = 0  // inicilizamos el valor del recno de la forma para limpiar la forma
    this.Form.dat_isu = {}
    return true

  }

}
