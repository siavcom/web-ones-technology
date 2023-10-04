//////////////////////////////////////////////
// BaseClass : reportForm
// Class : reportVtas
// Description : Documentos de ventas
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-09-20
// Update Date  : 2023-09-29
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/reports/VTAS/reportVtas";

export class ThisForm extends reportVtas {
  constructor() {
    super(); // inicializa la clase base
    this.tab_ord = "comedoc";
    this.prop.Name = "come5201";
    this.prop.textLabel = "Documentos";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5201"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come5201"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = true; // Muestra general o detallado

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
  }

  public async init() {
    await super.init();

    this.var_ord.prop.Value = "ndo_doc";

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

  public async sqlQuery(where: string) {
    let localWhere = "";
    if (this.tdo_tdo.prop.Value != "??")
      localWhere = `tdo_tdo='${this.tdo_tdo.prop.Value}' AND `;
    else localWhere = `cop_nom='C' AND `;

    if (this.mon_rep.prop.Value > 0) {
      localWhere = localWhere + `mon_doc=${this.mon_rep.prop.Value} AND`;
    }
    const des_fec =await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec =await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)

    if (where.length>0)
       where = ' AND '+where
      
    localWhere =
      localWhere +
      `  fec_doc>='${des_fec}' AND fec_doc<='${has_fec}' `+where;

    console.log(
      "sqlQuery =",
      `select * from ${this.vis_rep} WHERE ${localWhere} `
    );
    return `select * from ${this.vis_rep} WHERE ${localWhere} `;
  }
} // End ThisForm
