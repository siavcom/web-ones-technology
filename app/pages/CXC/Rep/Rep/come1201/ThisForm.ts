//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
// Description : Catalogo de clientes/proveedores
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-09-20
// Update Date  : 2023-09-29
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportCXC } from "@/classes/Siavcom/reports/CXC/reportCXC";
export class ThisForm extends reportCXC {

  constructor() {
    super(); // inicializa la clase base
    this.tab_ord = "man_comenom";
    this.prop.Name = "come1201";
    this.prop.Caption = "Catálogo de ";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come1201"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come1201"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = true; // Muestra general o detallado
    this.des_fec.prop.Visible = false; // Muestra general o detallado
    this.has_fec.prop.Visible = false; // Muestra general o detallado
    this.mon_rep.prop.Visible = false;
    this.mon_rep.prop.Disabled = true;
    this.des_fec.prop.Disabled = true;
    this.has_fec.prop.Disabled = true;
    this.tip_rep.prop.TabIndex = 2;
    this.con_con.prop.TabIndex = 1;
    this.con_con.prop.Visible = true;
    this.con_con.prop.Disabled = false;
    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
  }

  public async init() {
    await super.init();

    this.var_ord.prop.Value = "cod_nom";
    const par_prg = this.Form.Params[0].replaceAll("´", "").toLowerCase()
    var nom_par = "clientes "
    if (par_prg == 'p')
      nom_par = "proveedores "
    this.prop.Caption = "Catálogo de " + nom_par
    this.Form.tit_rep = 'Catálogo de ' + nom_par
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

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const tip_rep = this.tip_rep.prop.Value;
    this.Form.con_rep = where
    var par_prg = this.Form.Params[0].replaceAll("´", "").toLowerCase()
    this.Form.for_imp.prop.Value = "jr_come1201" + par_prg
    if (this.Form.tip_rep.prop.Value == 1)         // General
      this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "_d"
    else
      this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "_g"
    // armamos titulo    
    console.log('titulo=', this.Form.tit_rep)
    localWhere = ` cop_nom='${par_prg}' `;

    if (where.length > 0)
      where = ' AND ' + where

    localWhere =
      localWhere + where;
    if (tip_rep == 1)
      order = order + ",con_con "
    console.log(
      "sqlQuery =",
      `select * from ${this.vis_rep}  WHERE ${localWhere} ${order}`
    );
    return `select * from ${this.vis_rep} WHERE ${localWhere}  ${order}`;
  }
} // End ThisForm
