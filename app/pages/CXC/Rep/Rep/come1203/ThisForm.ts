//////////////////////////////////////////////
// BaseClass : reportForm
// Class : ThisForm
// Description : Cobranza
// Author : MGSR
// Creation : 2023-09-20
// Update Date  : 2023-09-29
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportCXC } from "@/classes/Siavcom/reports/CXC/reportCXC";
import { can_red } from "./can_red";

export class ThisForm extends reportCXC {
  public can_red = new can_red()
  constructor() {
    super(); // inicializa la clase base
    this.tab_ord = "man_comenom";
    this.prop.Name = "come1203";
    this.prop.Caption = "Cobranza";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come1203"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come1205c"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = true; // Muestra general o detallado
    this.tip_rep.prop.Disabled = false
    this.des_fec.prop.Visible = false; //
    this.has_fec.prop.Visible = true;
    this.des_fec.prop.Disabled = true; //
    this.has_fec.prop.Disabled = false;
    this.mon_rep.prop.Visible = true;
    this.mon_rep.prop.TabIndex = 1;
    this.has_fec.prop.TabIndex = 2;
    this.can_red.prop.TabIndex = 3;
    this.tip_rep.prop.TabIndex = 4;


    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
  }

  public async init() {
    await super.init();
    this.prop.cam_pri = 'cod_nom' // campo de buqueda principal
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "c")
      this.prop.Caption = "Cobranza de clientes ";
    else
      this.prop.Caption = "Cobranza de proveedores ";

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

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    let has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep = this.tip_rep.prop.Value;
    const can_red = this.can_red.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const mon_rep = this.mon_rep.prop.Value;
    const has_cod = this.Form.has_dat.prop.Value;
    const des_cod = this.Form.des_dat.prop.Value;
    this.Form.con_rep = where
    var par_prg = this.Form.Params[0].replaceAll("´", "").toLowerCase()
    this.Form.for_imp.prop.Value = "jr_come1203" + par_prg
    if (this.Form.tip_rep.prop.Value == 1)         // General
      this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "_d"
    else
      this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "_g"
    // armamos titulo    
    if (par_prg == "c")
      this.Form.tit_rep = "Cobranza de clientes "
    else
      this.Form.tit_rep = "Cobranza de proveedores "
    if (where.length > 1)
      where = ' and ' + where
    localWhere = localWhere + where;
    console.log(localWhere)
    has_fec = has_fec.replaceAll('-', '')
    var que_coa = " #resultado.coa_tdo='C' "
    if (par_prg == 'p')
      que_coa = " #resultado.coa_tdo='A' "
    this.Form.ord_vis = ' fec_doc asc ,' + this.Form.vis_rep + '.coa_tdo desc '
    this.Form.con_vis = ` FEC_DOC<='${has_fec}' AND (COA_TDO='C' OR COA_TDO='A') 
               AND MON_DOC=${mon_rep}
               AND COP_NOM='${par_prg}' `
    var ins_sql = ` select tdo_tdo,ndo_doc,coa_tdo,imp_tot, 
	dbo.F_cal_sal_pag_doc(doc.tdo_tdo,doc.ndo_doc,'${has_fec}') as mon_pag,
	dbo.F_cal_sal_asi_doc(doc.tdo_tdo,doc.ndo_doc,'${has_fec}') as mon_asi 
	INTO #RESULTADO from ${this.Form.vis_rep} doc where ${this.Form.con_vis} ${localWhere}
	   and tdo_tdo is not null  `
    ins_sql = ins_sql + `
	   select cod_nom,des_tdo,#resultado.tdo_tdo tdo_tdo,#resultado.ndo_doc ndo_doc,nom_nom,
		dir_nom,int_nom,ext_nom,col_nom,pob_nom,te1_nom,ref_doc,fec_doc,fve_doc,cop_nom,mon_pag,
		mon_asi,#resultado.coa_tdo coa_tdo,#resultado.imp_tot imp_tot,
    case when '${has_fec}'>=fve_doc then #resultado.imp_tot-(
    case when ${que_coa} then mon_pag else mon_asi end) else 0 end as vencido,
    case when '${has_fec}'<fve_doc then #resultado.imp_tot-(
    case when ${que_coa} then mon_pag else mon_asi end) else 0 end as novencido

      from #RESULTADO 
	join ${this.Form.vis_rep} on #RESULTADO.tdo_tdo=${this.Form.vis_rep}.tdo_tdo and #RESULTADO.ndo_doc=${this.Form.vis_rep}.ndo_doc `
    if (par_prg == 'c')
      ins_sql = ins_sql + ` where  
	     (#RESULTADO.coa_tdo='C' and ((mon_pag is null and #resultado.imp_tot not between -${can_red} and ${can_red}) 
	     or (#resultado.imp_tot-mon_pag) not between -${can_red} and ${can_red})) or 
	      (#resultado.coa_tdo='A' and ((mon_asi is null and #resultado.imp_tot not between -${can_red} and ${can_red}) 
	     or (#resultado.imp_tot-mon_asi) not between -${can_red} and ${can_red})) `
    else
      ins_sql = ins_sql + `where 
       (#RESULTADO.coa_tdo='A' and ((mon_pag is null and #resultado.imp_tot not between -${can_red} and ${can_red}) 
	     or (#resultado.imp_tot-mon_pag) not between -${can_red} and ${can_red})) or 
	      (#RESULTADO.coa_tdo='C' and ((mon_asi is null and #resultado.imp_tot not between -${can_red} and ${can_red}) 
	     or (#resultado.imp_tot-mon_asi) not between -${can_red} and ${can_red})) `
    ins_sql = ins_sql + `  
       order by ${this.Form.vis_rep}.${var_ord},${this.Form.ord_vis}
	 drop table #RESULTADO 
   `
    console.log(
      "sqlQuery =", ` ${ins_sql}  `

    );
    return `  ${ins_sql}  `;


  }

} // End ThisForm
