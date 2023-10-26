//////////////////////////////////////////////
// BaseClass : reportForm
// Class : reportVtas
// Description : Catalogo de clientes
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-09-20
// Update Date  : 2023-09-29
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportCXC } from "@/classes/reports/CXC/reportCXC";
import { con_con } from "~/classes/reports/CXC/con_con";
export class ThisForm extends reportCXC {
  public con_con = new con_con()
  constructor() {
    super(); // inicializa la clase base
    this.tab_ord = "comenom";
    this.prop.Name = "come1201";
    this.prop.textLabel = "Catálogo de clientes";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come1201c"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come1201c"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = true; // Muestra general o detallado
    this.tdo_tdo.prop.Visible = false; // Muestra general o detallado
    this.des_fec.prop.Visible = false; // Muestra general o detallado
    this.has_fec.prop.Visible = false; // Muestra general o detallado
    this.mon_rep.prop.Visible = false;
    this.tip_rep.prop.TabIndex = 1;
    this.con_con.prop.TabIndex = 2;
    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
  }

  public async init() {
    await super.init();

    this.var_ord.prop.Value = "cod_nom";

    console.log(
      "===================>Init Report name=",
      this.prop.Name,
      "var_ord",
      this.var_ord.prop.Value
    );
  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string,order:string) {
    let localWhere = "";
    var imp_con='N'
    if (this.con_con.prop.Value==1)
        imp_con="S";
    localWhere = ` cop_nom='C' `;

    if (where.length>0)
       where = ' AND '+where
      
    localWhere =
      localWhere  +where;
    if (imp_con="S")
       order=order+",con_con "
    console.log(
      "sqlQuery =",
      `select *,'${imp_con}' imp_con from ${this.vis_rep}  WHERE ${localWhere} ${order}`
    );
    return `select *,'${imp_con}' imp_con from ${this.vis_rep} WHERE ${localWhere}  ${order}`;
  }
} // End ThisForm
