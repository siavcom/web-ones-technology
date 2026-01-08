//////////////////////////////////////////////
// BaseClass : reportForm
// Class : Teams
// Description : Reporte de existencias con detalle de integracion
// Author : MGSR
// Creation : 2025/05/07
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
export class ThisForm extends reportInv {

  constructor() {
    super(1)  // inicializa la clase base
    this.tab_ord = 'man_comeisu'
    this.prop.Name = 'come3240'
    this.prop.Caption = "Existencias con detalle de integración"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3240'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3240'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false    // Muestra general odetallado
    this.tip_rep.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    // deshabilitamos los elementos que no necesitamos de la clase
    this.op_des_isu.prop.Visible = false
    this.op_has_isu.prop.Visible = false
    this.op_des_isu.prop.Disabled = true
    this.op_has_isu.prop.Disabled = true
    // ordenamos los elementos
    this.des_fec.prop.TabIndex = 1;
    this.has_fec.prop.TabIndex = 2;
    this.alm_rep.prop.TabIndex = 3;
    this.tip_imp.prop.TabIndex = 4;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.des_fec,
      [1]: this.has_fec,
      [2]: this.alm_rep,
      [3]: this.tip_imp
    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'

    this.block[1].component = {
      [0]: this.sep_fam,
      [1]: this.num_fam,
      [2]: this.op_des_fam,
      [3]: this.op_has_fam
    }
    this.block[1].prop.Visible = true
    this.block[1].prop.Disabled = false
    this.block[1].title = 'Familias'

    this.block[2].prop.Visible = false
    this.block[2].prop.Disabled = true



  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const des_fec = dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_imp = this.Form.tip_imp.prop.Value;
    const ini_isu = this.Form.des_dat.prop.Value;
    const fin_isu = this.Form.has_dat.prop.Value;
    const alm_rep = this.Form.alm_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const ima_pge = this.Form.mPublic.ima_pge;
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    this.Form.con_rep = where
    var pri_cla = 1,
      pos_tom = 30,
      var_fam = ' ',
      ord_vis = '',
      que_fam = ' des_fa1 ',
      tip_rep = 1,
      tit_rep = '';

    if (sep_fam == 1) {
      if (this.Form.op_has_fam.prop.Value < this.Form.op_des_fam.prop.Value || this.Form.op_has_fam.prop.Value.length == 0)
        this.Form.op_has_fam.prop.Value = "ZZZZZ";
      // nos traemos posicion de la familia
      const data = await this.Sql.localAlaSql(` select top 1 pri_cla,ult_cla,que_fam from now.loc_comefam where num_fam=${num_fam} `)
      pri_cla = data[0].pri_cla + 1
      pos_tom = data[0].ult_cla - pri_cla
      que_fam = ' ' + data[0].que_fam + ' '
      var_fam = `substring(cla_isu,${pri_cla},${pos_tom})`  // variable para sustituir en query
      localWhere = ` (${var_fam}>='${op_des_fam}' and ${var_fam}<='${op_has_fam}') `;
      ord_vis = `${var_fam},${var_ord}`
    }

    switch (tip_imp) {
      case 1: tit_rep = tit_rep + 'Insumos con existencia '
        break;
      case 2: tit_rep = tit_rep + 'Insumos sin existencia '
        break;
      case 3: tit_rep = tit_rep + 'Insumos solo con movimientos '
        break;
      case 4: tit_rep = tit_rep + 'Insumos existencia en negativo '
        break;
      case 5: tit_rep = tit_rep + 'todos los insumos '
        break;
    }
    console.log('tit_rep=', tit_rep, 'tip_imp=', tip_imp)

    var fec_exi = await addDay(this.des_fec.prop.Value, -1),
      con_con = ' ',
      con_fec = `  and (FEC_MOV>='${des_fec}' AND FEC_MOV<='${has_fec}' ) `,
      con_vis = ' where ', alm_alm = 'null', con_sql = '', ord_vis = '';
    fec_exi = fec_exi.replaceAll('-', '')
    if (this.alm_rep.prop.Value.trim() != '??') {					// si es un almacen especifico
      alm_alm = "'" + alm_rep + "'";
      con_con = con_con + ` and ALM_TDA='${this.alm_rep.prop.Value}'`
    }
    else
      con_con = con_con + ` and ave_tda=1 `
    con_vis = con_vis + " tin_tti='P' and (inv_tdo='E' or inv_tdo='S') "

    if (localWhere.length > 1)
      con_vis = con_vis + ` and ${localWhere}`
    if (where.length > 1)
      con_vis = con_vis + ` and ${where} `

    if (tip_rep == 1) {
      if (ord_vis.length > 0)
        ord_vis = ord_vis + ','
      ord_vis = ord_vis + 'des_tda'
    }
    if (sep_fam == 0) {
      if (var_ord.length > 0)
        ord_vis = `${var_ord},${ord_vis} `
    }

    localWhere = localWhere.replaceAll("'", '"')
    // obtenemos la descripcion de almacen   
    var des_tda = ' ', ins_loc = ''
    ins_loc = ` select des_tda from now.loc_cometda where alm_tda='${alm_rep}' `
    const data = await this.Sql.localAlaSql(`${ins_loc} `)
    console.log('dato=', data[0].des_tda)
    tit_rep = tit_rep + ' almacén: ' + data[0].des_tda.trim()
    this.Form.tit_rep = tit_rep
    console.log('this.Form.tit_rep=', this.Form.tit_rep, 'tit_rep=', tit_rep)
    var ins_sql = ` if OBJECT_ID('tempdb..#movtos') is not null  drop table #movtos 
   			if OBJECT_ID('tempdb..#totales') is not null  drop table #totales 
   			if OBJECT_ID('tempdb..#exist') is not null  drop table #exist 
   			if OBJECT_ID('tempdb..#resultado') is not null  drop table #resultado 
   			if OBJECT_ID('tempdb..#exist2') is not null drop table #exist2 
   			if OBJECT_ID('tempdb..#exist14') is not null drop table #exist14
    SELECT cla_isu as cla_mov,alm_tda alm_mov,MAX(des_tda) as des_alm,tdo_tdo,MAX(des_tdo) des_tdo,ori_des,MAX(des_ood) des_ood,
    ISNULL(SUM(case when INV_TDO='E' then CAN_MOV else 0 end ),0) AS can_ent,  
	 ISNULL(SUM(case when INV_TDO='S' then CAN_MOV else 0 end ),0) AS can_sal 
	 into #movtos from ${this.vis_rep} ${con_vis} ${con_fec} ${con_con} 
	 group by cla_isu,alm_tda,tdo_tdo,ori_des 
	select cla_mov cla_tot,alm_mov alm_tot,sum(can_ent) ent_alm,sum(can_sal) sal_alm,
	sum(can_ent-can_sal) ent_sal into #totales from #movtos group by cla_mov,alm_mov `
    if (tip_imp == 3) {
      ins_sql = ins_sql + ` select cla_mov cla_exi,alm_mov alm_exi,MAX(des_alm) as des_tda,
	dbo.F_CAL_EXI_GEN(CLA_mov,0,'${fec_exi}',${alm_alm},NULL,NULL,NULL) as exi_ini
		  into #exist from #movtos  group by cla_mov,alm_mov `
    }
    else
      ins_sql = ins_sql + ` select cla_isu cla_exi,alm_tda alm_exi,MAX(des_tda) as des_tda,
		 dbo.F_CAL_EXI_GEN(CLA_isu,0,'${fec_exi}',${alm_alm},NULL,NULL,NULL) as exi_ini  
		 into #exist from ${this.vis_rep} ${con_vis} and fec_mov<='${has_fec}' ${con_con} 
     group by cla_isu,alm_tda  `
    if (tip_imp == 1 || tip_imp == 4 || tip_imp == 2) {
      ins_sql = ins_sql + ` select cla_exi cla_14,SUM(ISNULL(exi_ini,0)+ISNULL(ent_sal,0)) exi_fin 
		 into #exist2 from #exist left join #totales on cla_tot=cla_exi and alm_tot=alm_exi group by cla_exi
		 select * into #exist14 from #exist2 where exi_fin`
      if (tip_imp == 1)
        ins_sql = ins_sql + `<>0 `
      if (tip_imp == 4)
        ins_sql = ins_sql + `<0 `
      if (tip_imp == 2)
        ins_sql = ins_sql + `<=0 `
    }
    ins_sql = ins_sql + ` select cla_exi,alm_exi alm_tda,des_tda,tdo_tdo,des_tdo,can_ent,can_sal,isnull(ent_alm,0) ent_alm,
	 isnull(sal_alm,0) sal_alm,isnull(ent_sal,0) ent_sal,isnull(exi_ini,0) exi_ini,ori_des,des_ood,vi_come3201.*,
   ${que_fam} as des_fam
	 into #resultado from #exist left join #movtos on cla_mov=cla_exi and alm_mov=alm_exi 
	 left join #totales on cla_tot=cla_exi and alm_exi=alm_tot  
	 join vi_come3201 on cla_isu=cla_exi `
    if (tip_imp == 1 || tip_imp == 4 || tip_imp == 2)
      ins_sql = ins_sql + ` join #exist14 on cla_14=cla_isu`
    ins_sql = ins_sql + ` select * from #resultado order by cla_isu,des_tda,tdo_tdo 
	    DROP TABLE #RESULTADO drop table #totales drop table #exist drop table #movtos `
    if (tip_imp == 1 || tip_imp == 4 || tip_imp == 2)
      ins_sql = ins_sql + ` drop table #exist2 drop table #exist14 `

    console.log("ins_sql", ins_sql,
      "sqlQuery =",
      ` ${ins_sql}  `

    );
    //return `select top 1 * from ${this.vis_rep}  `;

    return ` ${ins_sql} `;


  }

} // End ThisForm

