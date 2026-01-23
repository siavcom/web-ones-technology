//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// @baseClass  : COLUMN
// @class : tap_tap
// Description : Tipo de actividad
// @author: El Fer Blocks
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class tap_tap extends COLUMN {
  old_val: string;

  constructor() {
    super();
    this.prop.ColumnTextLabel = "Actividad"; // Column Header
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comeapy.tap_tap";
    this.prop.RowSourceType = 0; //4 1-Value, 2-Alias,3-Query SQL Server,4 -Query Local SQL , 5-Array
    this.prop.RowSource = "select des_tap,tap_tap from vi_cap_cometap order by des_tap";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "80%,20%";
    this.style.width = "200px";
    this.old_val = "";
  }

  override async when() {

    if (this.Parent.ord_tap.prop.Value >= 1) {
      this.prop.ReadOnly = true
      return true
    }
    const tap_tap = this.prop.Value.trim();

    const est_apy = this.Parent.est_apy.prop.Value.trim()

    // Si estado es finalizado, bloqueado, reprogramado o cancelado. No permite cambio de tipo
    if (this.Form.mPublic.log_usu != 'sa' && (est_apy == 'F' || est_apy == 'C') || est_apy == 'B' || est_apy == 'R') {
      this.prop.ReadOnly = true;
      return false;
    }


    if (this.old_val == this.prop.Value) return true;

    // Lee registro actual
    const res = await this.Sql.localAlaSql(
      `select key_pri from vi_cap_comeapy where recno=${this.Recno} `
    );


    // si es un registro viejo, no debe ser modificado
    if (res.length > 0 && res[0].key_pri > 0) {
      this.prop.ReadOnly = true;
      return false;
    }


    this.prop.RowSourceType = 0
    this.prop.RowSource =
      "select des_tap,tap_tap from vi_cap_cometap where ord_tap=0 order by des_tap";

    this.prop.RowSourceType = 4

    this.old_val = this.prop.Value.trim();

    return true;
  }

  async interactiveChange_ant() {

    // si no cambio la actividad
    if (this.old_val == this.prop.Value.trim()) return;

    const tap_tap = this.prop.Value.trim();
    const data = await this.Sql.localAlaSql(
      `select est_tap,ord_tap from vi_cap_cometap where tap_tap='${tap_tap}' `
    );
    console.log("tpa_tpa Value=", this.prop.Value, " data=", data);

    if (data.length == 0) {
      this.prop.Value = this.old_val
      return true
    }
    //  si no tiene orden , se puede cambiar por otra actividad sin orden
    if (
      data[0].ord_tap == 0 &&
      this.Parent.ord_tap.prop.Value == 0
    ) return true


    this.prop.Value = this.old_val
    return true;
  }
}
