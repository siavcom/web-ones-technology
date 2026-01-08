//////////////////////////////////////////////
// BaseClass : reportForm
// Class : ThisForm
// Description : Relación de IVA por pagar / acreditar
// Author : MGSR
// Creation : 2025-06-05
// Update Date  : 2025-06-06
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportCXC } from "@/classes/Siavcom/reports/CXC/reportCXC";

export class ThisForm extends reportCXC {
  constructor() {
    super(); // inicializa la clase base
    this.tab_ord = "man_comenom";
    this.prop.Name = "come1209";
    this.prop.Caption = "Relación de IVA";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come1209"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come1209"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false; // Muestra general o detallado
    this.tip_rep.prop.Disabled = true
    this.des_fec.prop.Visible = true; //
    this.has_fec.prop.Visible = true;
    this.des_fec.prop.Disabled = false; //
    this.has_fec.prop.Disabled = false;
    this.mon_rep.prop.Visible = false;
    this.mon_rep.prop.Disabled = true;
    this.des_fec.prop.TabIndex = 1;
    this.has_fec.prop.TabIndex = 2;
    this.tip_rep.prop.TabIndex = 3;

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
  }

  public async init() {
    await super.init();

    this.var_ord.prop.Value = "cod_nom";
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "c")
      this.prop.Caption = "Relación de IVA por pagar";
    else
      this.prop.Caption = "Relación de IVA por acreditar ";

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
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep = this.tip_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    this.Form.ord_vis = 'fec_doc,tdo_tdo,ndo_doc,ord_rep,fec_pag,tia_pag,nua_pag'
    this.Form.con_rep = where
    var par_prg = this.Form.Params[0].replaceAll("´", "").toLowerCase()
    this.Form.for_imp.prop.Value = "jr_come1209" + par_prg
    // armamos titulo y opciones por tipo de cliente o proveedor   
    var fec_iva = " and (fec_asi>='20020101' or fec_asi='19000101') ",
      tip_doc = '';

    if (par_prg == "c") {
      this.Form.tit_rep = "Relación de IVA por pagar ";
      tip_doc = " (cop_nom='C' and coa_tdo='A' and inv_tdo<>'E') "
    }
    else {
      this.Form.tit_rep = "Relación de IVA por acreditar "
      tip_doc = " (cop_nom='P' and coa_tdo='C' and inv_tdo<>'S') "
    }
    if (where.length > 1)
      where = ' and ' + where
    console.log(localWhere)

    this.Form.con_vis = ` (fec_doc>='${des_fec}' and FEC_DOC<='${has_fec}') 
               AND ${tip_doc} ${fec_iva}  `

    var ins_sql = ` 
      select * from ${this.vis_rep} where ${this.Form.con_vis}  
      ${where} order by ${this.Form.ord_vis} `
    console.log(
      "sqlQuery =", ` ${ins_sql} `
    );
    // return ` select top 10 * from ${this.Form.vis_rep} `
    return ` ${ins_sql} `;


  }

} // End ThisForm
