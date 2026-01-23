//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : ThisForm
// Description : Análisis de Cobranza
// @author: MGSR
// Creation : 2025-06-09
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportCXC } from "@/classes/Siavcom/reports/CXC/reportCXC";

export class ThisForm extends reportCXC {

  constructor() {
    super(0); // inicializa la clase base
    this.tab_ord = "man_comenom";
    this.prop.Name = "come1208";
    this.prop.Caption = "Análisis de Cobranza";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come1203"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come1208c"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false; // Muestra general o detallado
    this.tip_rep.prop.Disabled = true
    this.des_fec.prop.Visible = false; //
    this.has_fec.prop.Visible = true;
    this.des_fec.prop.Disabled = true; //
    this.has_fec.prop.Disabled = false;
    this.mon_rep.prop.Visible = true;
    this.mon_rep.prop.TabIndex = 1;
    this.has_fec.prop.TabIndex = 2;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.has_fec
    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'



    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
  }

  public override async init() {
    await super.init();
    this.prop.cam_pri = 'cod_nom' // campo de buqueda principal
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "c")
      this.prop.Caption = "Análisis de Cobranza de clientes ";
    else
      this.prop.Caption = "Análisis de Cobranza de proveedores ";

    this.var_ord.prop.Value = "cod_nom";

  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    let has_fec = dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep = this.tip_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const mon_rep = this.mon_rep.prop.Value;
    const has_cod = this.Form.has_dat.prop.Value;
    const des_cod = this.Form.des_dat.prop.Value;
    this.Form.con_rep = where
    var par_prg = this.Form.Params[0].replaceAll("´", "").toLowerCase()
    this.Form.for_imp.prop.Value = "jr_come1208" + par_prg
    // armamos titulo    
    this.Form.tit_rep = this.prop.Caption
    if (where.length > 1)
      where = ' and ' + where
    localWhere = localWhere + where;
    console.log(localWhere)
    has_fec = has_fec.replaceAll('-', '')
    var que_coa = " #resultado.coa_tdo='C' "
    if (par_prg == 'p')
      que_coa = " #resultado.coa_tdo='A' "
    this.Form.ord_vis = ' fec_doc asc ,vcome5201_g.coa_tdo desc '
    this.Form.con_vis = ` FEC_DOC<='${has_fec}' AND (COA_TDO='C' OR COA_TDO='A') 
               AND MON_DOC=${mon_rep}
               AND COP_NOM='${par_prg}' `
    var ins_sql = ` select cod_nom,nom_nom,coa_tdo,fec_doc,fve_doc, imp_tot, 
	dbo.F_cal_sal_pag_doc(doc.tdo_tdo,doc.ndo_doc,'${has_fec}') as mon_pag,
	dbo.F_cal_sal_asi_doc(doc.tdo_tdo,doc.ndo_doc,'${has_fec}') as mon_asi 
	INTO #RESULTADO from ${this.Form.vis_rep} doc where ${this.Form.con_vis} ${localWhere}
	   and tdo_tdo is not null  ;
   select cod_nom,coa_tdo,CAST(max(nom_nom) as varchar(150)) as nom_nom,CAST(sum(imp_tot-isnull(mon_pag,0)) as numeric) as imp_ven,
    CAST(sum(0) as numeric) as imp_nve,CAST(sum(0) as numeric) as imp_pag , MAX('N') tipo
    into #result from #RESULTADO where FVE_DOC<='${has_fec}' AND COA_TDO='C' AND (Imp_tot-isnull(mon_pag,0))>.045 
    group by cod_nom,coa_tdo
    union
    select cod_nom,coa_tdo,CAST(max(nom_nom) as varchar(150)) as nom_nom,CAST(sum(0) as numeric) as imp_ven,
    cast(sum(#resultado.imp_tot-isnull(mon_pag,0)) as numeric) as imp_nve,CAST((0) as numeric) as imp_pag,max('V') tipo 
    from #RESULTADO where FVE_DOC>'${has_fec}' AND COA_TDO='C' AND (#resultado.imp_tot-isnull(mon_pag,0))>.045 
    group by cod_nom,coa_tdo 
    union
    select cod_nom,coa_tdo,CAST(max(nom_nom) as varchar(150)) as nom_nom,0.0 as imp_nve,0.0 as  imp_ven,
    sum(#resultado.imp_tot-isnull(mon_asi,0)) as imp_pag,MAX('P') tipo  
     from #RESULTADO where COA_TDO='A' 
    group by cod_nom,coa_tdo 
    select cod_nom,max(nom_nom) as nom_nom,sum(imp_ven) as imp_ven,sum(imp_nve) as imp_nve,
    sum(imp_pag) as imp_pag,sum(imp_ven+imp_nve) as imp_tot 
    into #res from #result 
    where imp_ven>.045 or imp_nve>0.045 or imp_pag>0.045 
    group by cod_nom
    declare @imp_tot numeric(16,2), @imp_ven numeric(16,2),@imp_nve numeric(16,2),@imp_pag numeric(16,2)    
    select @imp_tot=sum(isnull(imp_ven,0)+ISNULL(imp_nve,0)),@imp_ven=sum(isnull(imp_ven,0)),
	   @imp_nve=sum(isnull(imp_nve,0)),@imp_pag=sum(isnull(imp_pag,0))
    from #res 
    select *,@imp_ven mimp_ven,@imp_nve mimp_nve,@imp_tot mimp_tot,@imp_pag mimp_pag from #res 
    order by imp_tot desc  
	 drop table #RESULTADO
   drop table #result
   drop table #res 
   `
    console.log(
      "sqlQuery =", ` ${ins_sql}  `

    );
    return `  ${ins_sql} `;


  }

} // End ThisForm
