//////////////////////////////////////////////
// BaseClass : Grid
// Class : table
// Description : Equipo
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
//import { cam_dat } from "./cam_dat";
import { fields_report } from "./fields_report";

//import { header_report } from "./header_report";

export class Grid extends GRID {
  public con_report = new con_report();
  public fields_report = new fields_report();
  //public header_report = new header_report();
  //public yes_report = new yes_report();

  constructor() {
    super();

    this.prop.Capture = false;
    this.prop.Valid = false;
    this.prop.Position = "main";
    //this.prop.RecordSource=this.Form.reportFields.prop.RecordSource
    this.prop.Visible = true;
    this.prop.textLabel = "Campos de la vista del reporte";
    this.prop.autoLoad = false; // se pone en falso para que no inicialice la tabla

    this.style.fontSize = "16px";
    this.style.color = "green";
    this.style.backgroundColor = "white";
  }

  public async appendRow(m?: {}) {
    if (!m) m = {};

    const db = this.Form.db;
    const campos = await db.localAlaSql("select * from Now.camposView");
    
    let fields ={} //  '' // '[';
    let coma=''
    for (let g = 0; g < campos.length; g++) {
      const d = campos[g];
      fields[d.cam_dat] ={ 
       //  {
  //      component: { type: "label", label: "Field", value: d.ref_dat ,readOnly:true},
        header:  { type: "edit", label: "Header", value: d.ref_dat,readOnly:false },
        enabled:  { type: "checkbox", label: "Enabled", value: 1,readOnly:false },
        position:{ type: "number", label: "Position", value: g,readOnly:false }
     // }
    }

    //  fields=fields+coma+JSON.stringify(field)
    //  coma=','
      // m.yes_report=1
      // m.header_report=m.des_cam
    }
    
    m = { };
    m.fields_report=JSON.stringify(fields)

    //m.fields_report=fields  //+']' 
    

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
