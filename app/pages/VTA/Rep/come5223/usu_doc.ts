//////////////////////////////////////////////
// @baseClass  : component
// @class : usu_doc
// Description : Usuarios
// @author: MGSR
// Creation : 2025/08/08
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
//import { PublicVar } from "~/stores/publicVar";
export class usu_doc extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Usuario";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 4; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = 0;
    //this.style.zIndex=9  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
    this.style.width = "300px";
  }
  public override async init(): Promise<void> {
    let user = "sa";

    if (this.Form.dialect == "postgres") user = "lower(current_user)";
    console.log('user', user)
    const data = await SQLExec(` SELECT log_usu as cve_usu,CAST(key_pri as char(4)) as num_usur FROM man_comeusu 
      union select ' TODOS' as cve_usu,'??' as num_usur `, 'loc_comeusu')

    if (user == 'sa') {
      this.prop.RowSource = ` SELECT cve_usu,num_usur from now.loc_comeusu ORDER BY cve_usu `
    }
    else {
      this.prop.RowSource = ` select cve_usu,num_usur from now.loc_comeusu where cve_usu=${user} `

    }

  }
}

