//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisform
// Description : Insumos por documento
// Author : MGSR
// Creation : 2025/02/07
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
import { in_tcd_tcd } from '~/classes/Siavcom/reports/INV/in_tcd_tcd'
import { in_tdo_tdo } from '~/classes/Siavcom/reports/INV/in_tdo_tdo'
import { tip_inf } from './tip_inf'
import { ubi_tda } from './ubi_tda'

export class ThisForm extends reportInv {
  public in_tdo_tdo = new in_tdo_tdo()
  public in_tcd_tcd = new in_tcd_tcd()
  public tip_inf = new tip_inf()
  public ubi_tda = new ubi_tda()
  constructor() {
    super(1)  // inicializa la clase base
    this.tab_ord = 'vi_come3226'
    this.prop.Name = 'come3226'
    this.prop.Caption = "Promedio mensual ventas contra inventario"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3226'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3226'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false
    this.tip_rep.prop.Disabled = true
    this.tip_imp.prop.Visible = false
    this.tip_imp.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.op_des_isu.prop.Visible = false
    this.op_des_isu.prop.Disabled = true
    this.in_tcd_tcd.prop.Visible = false
    this.in_tcd_tcd.prop.Disabled = true
    this.op_has_isu.prop.Visible = false
    this.op_has_isu.prop.Disabled = true
    this.ubi_tda.prop.Visible = false;
    this.ubi_tda.prop.Disabled = true;
    this.in_tdo_tdo.prop.TabIndex = 1;
    this.in_tcd_tcd.prop.TabIndex = 2;
    this.des_fec.prop.TabIndex = 3;
    this.has_fec.prop.TabIndex = 4;
    this.alm_rep.prop.TabIndex = 6;
    this.tip_inf.prop.TabIndex = 5;
    this.ubi_tda.prop.TabIndex = 7;
    this.sep_fam.prop.TabIndex = 20;
    this.in_tdo_tdo.prop.MultiSelect = true;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.in_tdo_tdo,
      [1]: this.in_tcd_tcd,
      [2]: this.des_fec,
      [3]: this.has_fec,
      [4]: this.tip_inf,
      [5]: this.alm_rep,
      [6]: this.ubi_tda
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
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_imp = this.tip_inf.prop.Value;
    const alm_rep = this.Form.alm_rep.prop.Value;
    const uac_pge = this.Form.mPublic.uac_pge;
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    const in_tdo_tdo = this.in_tdo_tdo.prop.Value;
    const in_tcd_tcd = this.in_tcd_tcd.prop.Value;
    const ubi_tda = this.ubi_tda.prop.Value;
    this.Form.con_rep = where;
    var pri_cla = 1,
      ult_cla = 29,
      pos_tom = 30,
      var_fam = ' ',
      que_fam = ' des_fa1 ';

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
    }

    // armamos fechas
    //   var tot_mes_p=((has_fec.getFullYear()*12)+(has_fec.getMonth() + 1))-((des_fec.getFullYear()*12)+(des_fec.getMonth()+1))+1
    console.log('aqui voy tot_mes_p=', '')
    var fec_ini = "'" + uac_pge.replaceAll('-', '') + "'"
    var has_fec_que = "'" + has_fec.replaceAll('-', '') + "'"
    var des_fec_exi = "'" + has_fec.replaceAll('-', '') + "'"
    var des_fec_que = "'" + des_fec.replaceAll('-', '') + "'"
    var con_vis = ""
    var num_ord = "C"
    var tit_rep1 = ''
    // armamos documentos si hay clasificacion
    var doc_imp = ''
    if (in_tdo_tdo.trim() != "??") {
      doc_imp = in_tdo_tdo.replaceAll(",", "','")
      // obtenemos la descripcion de los documentos seleccionados   
      var i = 0, j = doc_imp.length, tdo_tdo = ' ', des_tdo = ','
      for (let i = 0; i < j; i += 6) {
        tdo_tdo = doc_imp.slice(i, i + 3)
        const data = await this.Sql.localAlaSql(` select des_tdo from now.loc_cometdo where tdo_tdo='${tdo_tdo}'  `)
        des_tdo = des_tdo + "," + data[0].des_tdo.trim()
      }
      doc_imp = ' and tdo_tdo in (' + "'" + doc_imp + "'" + ') '
      tit_rep1 = tit_rep1 + ' ' + des_tdo.replaceAll(",,", "")

    }
    if (in_tcd_tcd.trim() != "??") {
      doc_imp = doc_imp + ' and tcd_tcd in (' + "'" + in_tcd_tcd.replaceAll(",", "','") + "'" + ') '
      const data = await this.Sql.localAlaSql(` select des_tcd from now.loc_cometcd where tdo_tdo='${this.in_tdo_tdo.prop.Value}' and tcd_tcd='${this.in_tcd_tcd.prop.Value}'  `)
      tit_rep1 = tit_rep1 + ' ' + data[0].des_tcd.trim()
    }

    // armamos almacen
    var alm_sql = ' '
    if (alm_rep.trim() != '??') {
      alm_sql = ` and alm_tda='${alm_rep}' `
      // generamos titulo del reporte
      const data = await this.Sql.localAlaSql(` select des_tda from now.loc_cometda where alm_tda='${alm_rep}' `)
      tit_rep1 = tit_rep1 + ' almacén ' + data[0].des_tda.trim()
    }
    else {
      tit_rep1 = tit_rep1 + ' todos los almacenes '
      alm_sql = ' and ave_tda=1 '
    }
    if (tip_imp == 2) {			// gneera variables par calculo de costo standar
      tit_rep1 = tit_rep1 + '  Por ubicación: ' + ubi_tda.trim()
      if (ubi_tda.trim() != "Todas")
        alm_sql = ' and left(ubi_tda,3) in (' + "'" + ubi_tda.replaceAll(",", "','") + "'" + ') '

    }

    var con_fec = " and (fec_mov>=" + des_fec_que + " AND fec_mov<=" + has_fec_que + ") "     // condicion para fechas
    con_vis = " TIN_TTI='P' "
    if (where.length > 0)
      where = ' AND ' + where
    if (localWhere.length > 0)
      localWhere = ' and ' + localWhere
    con_vis = ` where ${con_vis} ${localWhere} ${where} `
    var ins_sql = ""

    ins_sql = `select cla_isu,alm_tda,SUM(can_mov) as can_vta INTO #venta 
	 from  vi_come3226  ${con_vis} and inv_tdo='S'  ${doc_imp} ${con_fec} ${alm_sql}
	 group by cla_isu,alm_tda `
    if (has_fec < uac_pge)
      ins_sql = ins_sql = `
	 select distinct cla_isu,alm_tda,des_isu,des_tda,ubi_tda,un1_isu,${que_fam} as des_fam into #proalm 
   from vi_come3226 ${con_vis} AND fec_mov<=${has_fec_que} ${alm_sql} `
    else {
      var con_esp = con_vis + alm_sql
      con_esp = con_esp.replaceAll('alm_tda', 'comealm.alm_tda')
      con_esp = con_esp.replaceAll('cla_isu', 'comealm.cla_isu')
      ins_sql = ins_sql + `
	 select distinct comealm.cla_isu,comealm.alm_tda,des_isu,des_tda,ubi_tda,un1_isu,${que_fam} as des_fam into #proalm from man_comealm comealm 
	left join vi_come3226 on comealm.alm_tda=vi_come3226.alm_tda and comealm.cla_isu=vi_come3226.cla_isu ${con_esp}
`
    }
    ins_sql = ins_sql + ` select cla_isu,alm_tda,ubi_tda,un1_isu,des_tda,des_isu,des_fam,
	(case when cla_isu is not null and alm_tda is not null then dbo.F_CAL_EXI_GEN(cla_isu,0,${has_fec_que},alm_tda,NULL,NULL,NULL) else 0 end) as exi_ini,
    (case when cla_isu is not null and alm_tda is not null then dbo.F_CAL_pdo_gen(cla_isu,${has_fec_que},alm_tda,'P') else 0 end) as ped_pve,
    (case when cla_isu is not null and alm_tda is not null then dbo.F_CAL_pdo_gen(cla_isu,${has_fec_que},alm_tda,'C') else 0 end) as ped_cte 
	 into #rest from #proalm 
	 SELECT p.cla_isu,p.alm_tda,ubi_tda,des_tda,ISNULL(can_vta,0) can_vta,ISNULL(exi_ini,0) exi_ini,ISNULL(ped_pve,0) ped_pve,
	isnull(ped_cte,0) ped_cte,un1_isu,0 can_ent,0 can_sal,
	(case when p.cla_isu is null and p.alm_tda is null and ubi_tda is null then 'TOTAL GENERAL'
	 when p.cla_isu is not null and p.alm_tda is null and ubi_tda is null then 'Total producto'
	 when p.cla_isu is not null and ubi_tda is not null and p.alm_tda is null then 'Total ubicacion'
	 else des_isu end) as des_isu,des_fam 
	 FROM #rest p left join #venta r on p.cla_isu=r.CLA_ISU and p.alm_tda=r.ALM_TDA `
    if (sep_fam == 1)
      ins_sql = ins_sql + ` order by des_fam,p.cla_isu,p.ubi_tda,p.alm_tda `
    else
      ins_sql = ins_sql + ` ORDER BY p.CLA_ISU,p.ubi_tda,p.ALM_TDA `
    ins_sql = ins_sql + `
      DROP TABLE #rest  DROP TABLE #venta drop table #proalm 
`
    var ord_vis = ''
    console.log('ord_vis=', ord_vis)
    if (sep_fam == 1)    				//si no es reporte de separación de familias

      // utiliza la variable principal de orden y 
      // orden por clave y variable de orden	
      // y orden de la vista
      ord_vis = ` substring(cla_isu,${pri_cla},${pos_tom})`

    if (ord_vis.length > 3)
      order = order + ',' + ord_vis
    this.Form.tit_rep = tit_rep1
    console.log('tit_rep=' + this.Form.tit_rep)
    console.log("where = ", where, 'doc_imp=', `${doc_imp}`, 'con_fec=', ` ${con_fec}`, 'alm_sql=', `${alm_sql}`,
      "sqlQuery =",
      ` ${ins_sql}  `
    );
    return ` ${ins_sql}  `;
    //    return ` select top 10 * from vi_come3226 `


  }

} // End ThisForm

