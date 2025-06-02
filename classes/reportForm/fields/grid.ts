//////////////////////////////////////////////
// BaseClass : Grid
// Class : table
// Description : Campos en losreportes por pantalla
// Author : El Fer Blocks
// Creation : 2023-10-16
// Update Date  : 16/Octubre/2023
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { GRID } from "@/classes/Grid";

////////////////////////////////
// Columns
////////////////////////////////
import { con_report } from "./con_report";
import { des_report } from "./des_report";
import { act_report } from "./act_report";

import { fields_report } from "./fields_report";

//import { header_report } from "./header_report";

export class Grid extends GRID {
  public con_report = new con_report();
  public des_report = new des_report();
  public act_report = new act_report();
  public fields_report = new fields_report();


  constructor() {
    super();

    this.prop.Capture = false;
    this.prop.Valid = false;
    this.prop.Position = "main";
    //this.prop.RecordSource=this.Form.reportFields.prop.RecordSource
    this.prop.Visible = true;
    this.prop.Caption = "Campos de la vista del reporte";
    this.prop.autoLoad = false; // se pone en falso para que no inicialice la tabla

    this.style.fontSize = "16px";
    this.style.color = "green";
    this.style.backgroundColor = "white";

  }

  public async appendRow(m?: {}) {
    if (!m) m = {};

    const db = this.Form.db;
    const campos = await db.localAlaSql("select * from Now.camposView");

    let fields = {}

    for (let g = 0; g < campos.length; g++) {
      const d = campos[g];
      fields[d.cam_dat] = {

        //      component: { type: "label", label: "Field", value: d.ref_dat ,readOnly:true},
        header: { type: "edit", label: "Header", value: d.ref_dat, readOnly: false, style: { width: '100px' } },
        enabled: { type: "checkbox", label: "Enabled", value: 1, readOnly: false, style: { width: '64px' } },
        position: { type: "number", label: "Position", value: g, readOnly: false, style: { width: '64px' } }

      }


      // m.yes_report=1
      // m.header_report=m.des_cam
    }

    m = {};
    m.fields_report = JSON.stringify(fields)

    const data = await db.localAlaSql(
      `select max(con_report)+1 as con_report from ${this.prop.RecordSource} `
    );

    if (data[0] && data[0].con_report && data[0].con_report != null)
      m.con_report = data[0].con_report;
    else
      m.con_report = 1;

    m.view_report = this.Form.vis_rep;

    await super.appendRow(m);
    // console.log('TIP_REP appendRow ala ===>',await db.localAlaSql(`select * from ${this.prop.RecordSource}`))

  }
}
