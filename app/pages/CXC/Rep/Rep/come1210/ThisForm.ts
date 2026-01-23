//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : ThisForm
// Description : Cobranza
// @author: MGSR
// Creation : 2023-09-20
// Update Date  : 2023-09-29
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportCXC } from "@/classes/Siavcom/reports/CXC/reportCXC";
import { dia_ven } from "./dia_ven";
import { tip_fec } from "./tip_fec";
import { tip_res } from "./tip_res";
import { imp_may } from "./imp_may";
import { imp_men } from "./imp_men";

export class ThisForm extends reportCXC {
  public dia_ven = new dia_ven()
  public tip_fec = new tip_fec()
  public tip_res = new tip_res()
  public imp_may = new imp_may()
  public imp_men = new imp_men()

  constructor() {
    super(); // inicializa la clase base
    this.tab_ord = "man_comenom";
    this.prop.Name = "come1210";
    this.prop.Caption = "Relación de documentos vencidos";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come1203"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come1210c"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false; // Muestra general o detallado
    this.tip_rep.prop.Disabled = true
    this.des_fec.prop.Visible = true; //
    this.has_fec.prop.Visible = true;
    this.des_fec.prop.Disabled = false //
    this.has_fec.prop.Disabled = false;
    this.mon_rep.prop.Visible = true;
    this.mon_rep.prop.TabIndex = 1;
    this.des_fec.prop.TabIndex = 2;
    this.has_fec.prop.TabIndex = 3;
    this.dia_ven.prop.TabIndex = 4;
    this.tip_fec.prop.TabIndex = 5;
    this.imp_may.prop.TabIndex = 6;
    this.imp_men.prop.TabIndex = 7;
    this.tip_res.prop.TabIndex = 8;
  }

  public async init() {
    await super.init();
    this.prop.cam_pri = 'cod_nom' // campo de buqueda principal
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "c")
      this.prop.Caption = "Relación de documentos vencidos de clientes ";
    else
      this.prop.Caption = "Relación de documentos vencidos de proveedores ";

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
    let des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const dia_ven = this.dia_ven.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const mon_rep = this.mon_rep.prop.Value;
    const imp_men = this.imp_men.prop.Value;
    const imp_may = this.imp_may.prop.Value;
    const tip_fec = this.tip_fec.prop.Value;
    const tip_res = this.tip_res.prop.Value;

    this.Form.con_rep = where
    var par_prg = this.Form.Params[0].replaceAll("´", "").toLowerCase()
    this.Form.for_imp.prop.Value = "jr_come1210" + par_prg
    if (par_prg == "c")
      this.Form.tit_rep = "Relación de documentos vencidos de clientes "
    else
      this.Form.tit_rep = "Relación de documentos vencidos de proveedores "
    if (where.length > 1)
      where = ' and ' + where
    localWhere = localWhere + where;
    console.log(localWhere)
    has_fec = has_fec.replaceAll('-', '')
    des_fec = des_fec.replaceAll('-', '')
    var con_fec = 'fec_doc'
    if (this.tip_fec.prop.Value == 2)
      con_fec = 'fve_doc'
    var que_coac = " #resultado.coa_tdo='C' ", que_coaa = " #resultado.coa_tdo='A' ", con_imp = ' '
    if (par_prg == 'p') {
      que_coac = " #resultado.coa_tdo='A' "
      que_coaa = " #resultado.coa_tdo='C' "
    }
    if (imp_may != "0")
      con_imp = ` and (IMP_TOT>=${imp_may} and imp_tot<=${imp_men}) `

    this.Form.ord_vis = ' fec_doc asc ,coa_tdo desc '
    this.Form.con_vis = ` (fec_doc>='${des_fec}' and FEC_DOC<='${has_fec}') AND (COA_TDO='C' OR COA_TDO='A') 
               AND MON_DOC=${mon_rep}
               AND COP_NOM='${par_prg}' ${con_imp} `
    var que_opc = ' ', ins_where = ''

    if (tip_res == 'N')
      que_opc = ' not between -0.045 and 0.045 '
    if (tip_res == 'S')
      que_opc = ' between -0.045 and 0.045 '
    if (tip_res != 'T')
      ins_where = `
  		 where (${que_coac} and((mon_pag is null and #resultado.imp_tot ${que_opc}) 
		     or (#resultado.imp_tot-mon_pag) ${que_opc})) or 
		      (${que_coaa} and((mon_asi is null and #resultado.imp_tot ${que_opc})
		     or (#resultado.imp_tot-mon_asi) ${que_opc})) 
    `
    var ins_sql = ` select *, 
	dbo.F_cal_sal_pag_doc(doc.tdo_tdo,doc.ndo_doc,'${has_fec}') as mon_pag,
	dbo.F_cal_sal_asi_doc(doc.tdo_tdo,doc.ndo_doc,'${has_fec}') as mon_asi 
	INTO #RESULTADO from ${this.Form.vis_rep} doc where ${this.Form.con_vis} ${localWhere}
	   and tdo_tdo is not null  `
    ins_sql = ins_sql + `
	   select *,DATEDIFF(dd,${con_fec},'${has_fec}') dias_doc 
  from #RESULTADO ${ins_where}
       order by ${var_ord},${this.Form.ord_vis}
	 drop table #RESULTADO 
   `
    console.log(
      "sqlQuery =", ` ${ins_sql}  `

    );
    return `  ${ins_sql} `;


  }

} // End ThisForm
