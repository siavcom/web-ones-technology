//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : COLUMN
// Class : eau_tap
// Description : Estatus
// Author : El Fer Blocks
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { COLUMN } from "@/classes/Column";

export class est_apy extends COLUMN {
  constructor() {
    super();

    // const nom_ind=renglon[i]['nom_ind']

    this.textLabel = "Estatus"; // Column Header
    this.prop.Type = "text";
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_comeapy.est_apy";
    this.prop.RowSource = [
      [
        "Inicio",
        "Bloqueada",
        "Autorizada",
        "Cancelada",
        "Reprogramar",
        "Finalizada",
      ],
      ["I", "B", "A", "C", "R", "F"],
    ];
    this.prop.RowSourceType = 5;
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;

    this.prop.Capture = true;
    this.prop.updateKey = false;
    this.prop.componentStyle.width = "100px";
    // this.style.zIndex = 1;
    this.style.width = "110px";
  }

  async init() {
    if (!this.Form.db.View.vi_cap_cometap) {
      await this.Form.db.useNodata("vi_cap_cometap");
      return;
    }

    const data = await this.Form.db.localAlaSql(
      `select est_tap from vi_cap_cometap where tap_tap='${this.Parent.tap_tap.prop.Value}'`
    );
    this.prop.RowSource = eval(data[0].est_tap);
    return;
  }

  async when() {
    this.init();
    this.prop.ReadOnly = this.Parent.tap_tap.when();
    return !this.prop.ReadOnly;
  }
}
