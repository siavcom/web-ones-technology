//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : ThisForm
// Description : Análisis de antigüedad de saldos
// @author: MGSR
// Creation : 2023-09-20
// Update Date  : 2023-09-29
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportCXC } from "@/classes/Siavcom/reports/CXC/reportCXC";
import { ran_tres } from "./ran_tres";
import { ran_dos } from "./ran_dos";
import { ran_uno } from "./ran_uno";
import { tip_fec } from "./tip_fec";
export class ThisForm extends reportCXC {
  public ran_uno = new ran_uno()
  public ran_dos = new ran_dos()
  public ran_tres = new ran_tres()
  public tip_fec = new tip_fec()
  constructor() {
    super(0); // inicializa la clase base
    this.tab_ord = "man_comenom";
    this.prop.Name = "come1204";
    this.prop.Caption = "Análisis de antigüedad de saldos";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come1203"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come1204c"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = true; // Muestra general o detallado
    this.tip_rep.prop.Disabled = false
    this.des_fec.prop.Visible = false; //
    this.has_fec.prop.Visible = true;
    this.des_fec.prop.Disabled = true; //
    this.has_fec.prop.Disabled = false;
    this.mon_rep.prop.Visible = true;
    this.ran_uno.prop.TabIndex = 1;
    this.ran_dos.prop.TabIndex = 2;
    this.ran_tres.prop.TabIndex = 3;
    this.mon_rep.prop.TabIndex = 4;
    this.has_fec.prop.TabIndex = 5;
    this.tip_fec.prop.TabIndex = 6;
    this.tip_rep.prop.TabIndex = 7;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.ran_uno,
      [1]: this.ran_dos,
      [2]: this.ran_tres,
      [3]: this.has_fec,
      [4]: this.tip_fec
    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
  }

  public override async init() {
    await super.init();

    this.var_ord.prop.Value = "cod_nom";
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "c")
      this.prop.Caption = "Análisis de antigüedad de saldos de clientes ";
    else
      this.prop.Caption = "Análisis de antigüedad de saldos de proveedores ";
  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    let has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep = this.tip_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const mon_rep = this.mon_rep.prop.Value;
    const tip_fec = this.tip_fec.prop.Value;
    const ran_uno = this.ran_uno.prop.Value;
    const ran_dos = this.ran_dos.prop.Value;
    const ran_tres = this.ran_tres.prop.Value;
    this.Form.con_rep = where
    var par_prg = this.Form.Params[0].replaceAll("´", "").toLowerCase()
    this.Form.for_imp.prop.Value = "jr_come1204" + par_prg
    if (this.Form.tip_rep.prop.Value == 1)         // General
      this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "_d"
    else
      this.Form.for_imp.prop.Value = this.Form.for_imp.prop.Value + "_g"
    // armamos titulo    
    if (par_prg == "c")
      this.Form.tit_rep = "Análisis de antigüedad de saldos de clientes "
    else
      this.Form.tit_rep = "Análisis de antigüedad de saldos de proveedores "
    if (where.length > 1)
      where = ' and ' + where
    localWhere = localWhere + where;
    console.log(localWhere)
    has_fec = has_fec.replaceAll('-', '')
    var can_red = "0.045", con_fec = 'fec_doc'
    if (this.tip_fec.prop.Value == 2)
      con_fec = 'fve_doc'
    this.Form.ord_vis = ' fec_doc asc ,' + this.Form.vis_rep + '.coa_tdo desc '
    if (par_prg == 'p')
      this.Form.ord_vis = ' fec_doc asc ,' + this.Form.vis_rep + '.coa_tdo asc '
    var que_coa = " #resultado.coa_tdo='C' "
    if (par_prg == 'p')
      que_coa = " #resultado.coa_tdo='A' "

    this.Form.con_vis = ` FEC_DOC<='${has_fec}' AND (COA_TDO='C' OR COA_TDO='A') 
               AND MON_DOC=${mon_rep}
               AND COP_NOM='${par_prg}' `

    var ins_sql = ` select tdo_tdo,ndo_doc,coa_tdo,imp_tot, 
	dbo.F_cal_sal_pag_doc(doc.tdo_tdo,doc.ndo_doc,'${has_fec}') as mon_pag,
	dbo.F_cal_sal_asi_doc(doc.tdo_tdo,doc.ndo_doc,'${has_fec}') as mon_asi 
	INTO #RESULTADO from ${this.Form.vis_rep} doc where ${this.Form.con_vis} ${localWhere}
	   and tdo_tdo is not null  `
    ins_sql = ins_sql + `
	   select cod_nom,des_tdo,isnull(des_tcd,' ') des_tcd,#resultado.tdo_tdo tdo_tdo,#resultado.ndo_doc ndo_doc,nom_nom,
		dir_nom,int_nom,ext_nom,col_nom,pob_nom,te1_nom,ref_doc,fec_doc,fve_doc,cop_nom,mon_pag,
		mon_asi,#resultado.coa_tdo coa_tdo,#resultado.imp_tot imp_tot,
    case when '${has_fec}'>='${con_fec}' then #resultado.imp_tot*(case when #resultado.coa_tdo='A' then -1 else 1 end)-(
    case when ${que_coa} then mon_pag else mon_asi end) else 0 end as vencido,
    case when '${has_fec}'<'${con_fec}' then #resultado.imp_tot*(case when #resultado.coa_tdo='A' then -1 else 1 end)-(
    case when ${que_coa} then mon_pag else mon_asi end) else 0 end as novencido,
    DATEDIFF(dd,${con_fec},'${has_fec}') dif_dias,
    case when DATEDIFF(dd,${con_fec},'${has_fec}')>=0 and DATEDIFF(dd,${con_fec},'${has_fec}')<=${ran_uno}
    then #resultado.imp_tot*(case when #resultado.coa_tdo='A' then -1 else 1 end)-(
    case when #resultado.coa_tdo='C' then mon_pag else mon_asi end) else 0 end as ven1,
      case when DATEDIFF(dd,${con_fec},'${has_fec}')>${ran_uno} and DATEDIFF(dd,${con_fec},'${has_fec}')<=${ran_dos}
    then #resultado.imp_tot*(case when #resultado.coa_tdo='A' then -1 else 1 end)-(
    case when #resultado.coa_tdo='C' then mon_pag else mon_asi end) else 0 end as ven2,
      case when DATEDIFF(dd,${con_fec},'${has_fec}')>${ran_dos} and DATEDIFF(dd,${con_fec},'${has_fec}')<=${ran_tres}
    then #resultado.imp_tot*(case when #resultado.coa_tdo='A' then -1 else 1 end)-(
    case when #resultado.coa_tdo='C' then mon_pag else mon_asi end) else 0 end as ven3,
      case when DATEDIFF(dd,${con_fec},'${has_fec}')>${ran_tres} 
    then #resultado.imp_tot*(case when #resultado.coa_tdo='A' then -1 else 1 end)-(
    case when #resultado.coa_tdo='C' then mon_pag else mon_asi end) else 0 end as ven4
      from #RESULTADO 
	join ${this.Form.vis_rep} on #RESULTADO.tdo_tdo=${this.Form.vis_rep}.tdo_tdo and #RESULTADO.ndo_doc=${this.Form.vis_rep}.ndo_doc `
    if (par_prg == 'c')
      ins_sql = ins_sql + ` where  
	     (#RESULTADO.coa_tdo='C' and((mon_pag is null and #resultado.imp_tot not between -${can_red} and ${can_red}) 
	     or (#resultado.imp_tot-mon_pag) not between -${can_red} and ${can_red})) or 
	      (#resultado.coa_tdo='A' and ((mon_asi is null and #resultado.imp_tot not between -${can_red} and ${can_red}) 
	     or (#resultado.imp_tot-mon_asi) not between -${can_red} and ${can_red})) `
    else
      ins_sql = ins_sql + `where (#RESULTADO.coa_tdo='A' and((mon_pag is null and #resultado.imp_tot not between -${can_red} and ${can_red}) 
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
