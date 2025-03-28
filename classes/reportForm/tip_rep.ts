//////////////////////////////////////////////
// Clase : tip_rep
// Descripcion : Si es =1 reporte detallado
// Author : Fernando Cuadras Angulo
// Creacion : 14/Sep/2023
// Ult.Mod  :
/////////////////////////////////////////////

///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class tip_rep extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.Type = "checkBox";
    this.prop.textLabel = "Reporte detallado";
    this.prop.Value = 0;
    //this.prop.TabIndex = 102;
    this.prop.Visible = false    // No muestra general o detallado
    this.prop.Disabled = false    // No muestra general o detallado

  }

  async init() {
    if (this.prop.Visible == false) return;
    if (this.Form.for_ori.length == 0)
      this.Form.for_ori = this.Form.for_imp.prop.Value.trim();
    if (this.Form.vis_ori.length == 0)
      this.Form.vis_ori = this.Form.vis_rep.trim();
    this.interactiveChange()
  }

  async interactiveChange() {

    if (this.prop.Value == 1) {
      // Detallado
      this.Form.for_imp.prop.Value = this.Form.for_ori + "_d";
      this.Form.vis_rep = this.Form.vis_ori + "_d";
    } else {
      //General
      this.Form.for_imp.prop.Value = this.Form.for_ori + "_g";
      this.Form.vis_rep = this.Form.vis_ori + "_g";
    }
    /*     cambia los fields que se muestran en el reporte
     const m={view_report:this.Form.vis_rep  }
     this.Form.reportFields.Grid.prop.RecordSource=''
     await  use('vi_cap_db_reportfields',m)
 
     this.Form.reportFields.Grid.prop.RecordSource='vi_cap_db_reportfields'
     
     if (this.Sql.db.View.vi_cap_db_reportfields.recCount==0){ // Si no tiene registros, inserta la primera vista 
       
       await this.Form.reportFields.Grid.appendRow()
 
    }
     */
    this.Form.init()

    return;
  }
}
/*
 const  data = await  localAlaSql('select * from Now.camposView')
const  field={}
 for (let g=0;g<data.length;g++){
   const d=data[g]
   field[d.cam_dat]=[{ type: 'label',label: 'Field', value: d.des_dat},
                     { type: 'editText',label:'Header', value: d.des_dat,},
                     { type: 'checkBox',label :'Enabled', value:1}
                     
   ]

   // m.yes_report=1
   // m.header_report=m.des_cam
 } 
 const m={fields_report : JSON.stringify(field)}
*/
