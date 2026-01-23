//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : thisform
// Description : Valorización de inventario
// @author: MGSR
// Creation : 2025-01-10
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
import { cal_reo } from './cal_reo'
import { tip_reo } from './tip_reo'
import { tip_afe } from './tip_afe';
import { per_min } from './per_min';
import { des_per } from './des_per';
import { alm_afe } from './alm_afe';

export class ThisForm extends reportInv {
  public cal_reo = new cal_reo();
  public tip_reo = new tip_reo();
  public tip_afe = new tip_afe();
  public per_min = new per_min();
  public des_per = new des_per();
  public alm_afe = new alm_afe();

  constructor() {
    super(2)  // inicializa la clase base
    this.tab_ord = 'vi_come3206'
    this.prop.Name = 'come3206'
    this.prop.Caption = "Puntos de reorden"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3206'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3206'   // no incluir extencion jasper o jrxml
    // deshabilitamos elementos que no se utilizaran
    this.tip_rep.prop.Visible = false    // Muestrafalseeral odetallado
    this.tip_rep.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.des_fec.prop.Visible = false
    this.des_fec.prop.Disabled = true
    this.has_fec.prop.Visible = true
    this.has_fec.prop.Disabled = false
    this.op_des_isu.prop.Visible = false
    this.op_des_isu.prop.Disabled = true
    this.op_has_isu.prop.Visible = false
    this.op_has_isu.prop.Disabled = true
    this.tip_imp.prop.Visible = false
    this.tip_imp.prop.Disabled = true
    this.alm_afe.prop.Visible = false
    this.alm_afe.prop.Disabled = true
    this.tip_afe.prop.Visible = false
    this.tip_afe.prop.Disabled = true
    this.des_per.prop.Visible = false
    this.des_per.prop.Disabled = true
    this.per_min.prop.Visible = false
    this.per_min.prop.Disabled = true
    this.tip_reo.prop.Visible = false
    this.tip_reo.prop.Disabled = true

    // habilitamos elementos que si utilizaran
    this.alm_rep.prop.Visible = true
    this.alm_rep.prop.Disabled = false
    this.alm_rep.prop.MultiSelect = true
    this.sep_fam.prop.Visible = true
    this.sep_fam.prop.Disabled = false
    // damos orden a los elementos
    this.has_fec.prop.TabIndex = 1
    this.alm_rep.prop.TabIndex = 2
    this.sep_fam.prop.TabIndex = 50
    this.cal_reo.prop.TabIndex = 4
    this.des_per.prop.TabIndex = 5
    this.per_min.prop.TabIndex = 6
    this.tip_reo.prop.TabIndex = 7
    this.tip_afe.prop.TabIndex = 8
    this.alm_afe.prop.TabIndex = 9
    // definicion de bloques
    this.block[0].component = {
      [0]: this.alm_rep,
      [1]: this.has_fec
    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'

    this.block[2].component = {
      [0]: this.sep_fam,
      [1]: this.num_fam,
      [2]: this.op_des_fam,
      [3]: this.op_has_fam
    }
    this.block[2].prop.Visible = true
    this.block[2].prop.Disabled = false
    this.block[2].title = 'Familias'

    this.block[1].component = {
      [0]: this.cal_reo,
      [1]: this.des_per,
      [2]: this.per_min,
      [3]: this.tip_reo,
      [4]: this.tip_afe,
      [5]: this.alm_afe
    }
    this.block[1].prop.Visible = true
    this.block[1].prop.Disabled = false
    this.block[1].title = 'Cálculo de puntos de reorden'

    this.block[3].prop.Visible = false
    this.block[3].prop.Disabled = true

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte


  }
  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    var localWhere = "";
    var alm_rep = this.Form.alm_rep.prop.Value;
    const ima_pge = this.Form.mPublic.ima_pge;
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    const has_fec = this.has_fec.prop.Value;
    const per_min = this.per_min.prop.Value;
    const alm_afe = this.alm_afe.prop.Value;
    var cal_reo = this.cal_reo.prop.Value + 1;
    const tip_rep = this.tip_rep.prop.Value;
    var des_per = this.des_per.prop.Value;
    var has_fec_que = "'" + has_fec.replaceAll('-', '') + "'"
    var des_fec_exi = "'" + has_fec.replaceAll('-', '') + "'"
    var des_fec_que = "'" + des_per.replaceAll('-', '') + "'"
    var var_ord = this.var_ord.prop.Value
    var tip_reos = 'N'
    this.Form.con_rep = where
    des_per = "'" + this.des_per.prop.Value.slice(0, 7).replaceAll('-', '') + "'"
    var has_per = "'" + this.has_fec.prop.Value.slice(0, 7).replaceAll('-', '') + "'"


    if (this.tip_reo.prop.Value == 0)
      tip_reos = 'N';
    else
      tip_reos = 'S';

    var fec_vta = this.des_per.prop.Value;
    var tip_afe = 'N';

    if (this.tip_afe.prop.Value == 0)
      tip_afe = 'N'
    else
      tip_afe = 'S'

    if (tip_afe == 'N')
      this.alm_afe.prop.Value = '   '

    var ini_isu = '',
      fin_isu = 'ZZZZZZZZZZZZZZZZZ';

    var pri_cla = 1,
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
      order = order.replaceAll("order by ", "order by des_fam,")
    }

    var con_sql = ' ',
      sql_alm = 'null',
      tit_rep = '',
      alm_mul = alm_rep;
    if (alm_mul != '?? ') {
      sql_alm = alm_mul
      alm_mul = alm_mul.replaceAll(",", "','")
      console.log('sql_alm=' + sql_alm)
      con_sql = con_sql + ' alm_tda in (' + "'" + alm_mul + "'" + ') '
      sql_alm = "'" + sql_alm + "'"
      // obtenemos la descripcion de los almacenes seleccionados   
      var i = 0, j = alm_mul.length, alm_tda = ' ', des_tda = ','
      for (let i = 0; i < j; i += 6) {
        alm_tda = alm_mul.slice(i, i + 3)
        const data = await this.Sql.localAlaSql(` select des_tda from now.loc_cometda where alm_tda='${alm_tda}' `)
        des_tda = des_tda + "," + data[0].des_tda.trim()
      }
      tit_rep = tit_rep + des_tda.replaceAll(",,", "")
    }
    else {
      con_sql = con_sql + ` ave_tda=1 `;
      tit_rep = tit_rep + ' Todos'
    }
    alm_rep = '<' + alm_rep.replaceAll(",", "><") + '>'
    this.Form.tit_rep = tit_rep
    if (localWhere.length > 3)
      localWhere = localWhere + ' and '
    localWhere = localWhere + con_sql

    if (localWhere.length < 3)
      localWhere = " tin_tti='P' ";
    // localWhere=localWhere.replaceAll("'",'"')

    if (where.length > 0)
      localWhere = localWhere + 'AND ' + where;
    //

    //
    if (cal_reo == 1) {
      localWhere = `
        if OBJECT_ID('tempdb..#res') is not null  drop table #res ;
            if OBJECT_ID('tempdb..#res_pre') is not null  drop table #res_pre ; 
            if OBJECT_ID('tempdb..#result00') is not null  drop table #result00 ; 
            if OBJECT_ID('tempdb..#tempo01') is not null  drop table #tempo01 ; 
            if OBJECT_ID('tempdb..#tempo02') is not null  drop table #tempo02  
        select cla_isu,des_isu,pre_alm,min_alm,max_alm,un1_isu,ubi_alm,cpe_alm,alm_tda,
        ${que_fam} as des_fam,
        dbo.F_CAL_pdo_gen(CLA_ISU,${has_fec_que},alm_tda,'P') as ped_pve,
        dbo.F_CAL_pdo_gen(CLA_ISU,${has_fec_que},alm_tda,'C') as ped_cte, 
        dbo.F_CAL_EXI_GEN(CLA_ISU,0,${des_fec_exi},alm_tda,NULL,NULL,NULL) as exi_ini,sku_isu 
	      into #tempo01 from  ${this.vis_rep} where  ${localWhere} and pre_alm > 0 
	      select cla_isu,SUM(pre_alm) as pre_alm,SUM(min_alm) as min_alm,SUM(max_alm) as max_alm,MAX(un1_isu) as un1_isu,MAX(cpe_alm) as cpe_alm,
	      MAX(des_isu) as des_isu,MAX(ubi_alm) as ubi_alm,SUM(ped_pve) as ped_pve,SUM(ped_cte) as ped_cte,SUM(exi_ini) as exi_ini,MAX(sku_isu) as 
	      sku_isu,max(des_fam) as des_fam into #tempo02 from #tempo01 
	      group by cla_isu order by cla_isu 
	      select *,ped_cte as ped_tem,ped_pve as ppv_tem,pre_alm as pre_tem,min_alm as min_tem,max_alm as max_tem,exi_ini as exi_tem,
	      exi_ini as vta_tem,0 as tot_fac from  #tempo02 ${order}
          `
    }
    if (cal_reo == 2) {
      localWhere = `
          select cla_isu,SUM(pre_alm) as pre_alm,SUM(min_alm) as min_alm,SUM(max_alm) as max_alm,MAX(un1_isu) as un1_isu,
       MAX(cpe_alm) as cpe_alm,MAX(des_isu) as des_isu,MAX(ubi_alm) as ubi_alm,MAX(sku_isu) as sku_isu,max(${que_fam}) as des_fam
       into #res from ${this.vis_rep}  where  ${localWhere} group by cla_isu 
       select vcome5203.cla_isu as cla_mov,fec_mov,COD_NOM,(case when ent_sal=1 then 'C' when ent_sal=-1 then 'A' end) as coa_tdo,can_mov as can_cap, 
           tdo_tdo,ndo_doc into #result00 from vcome5203  
       join #res on #res.cla_isu=vcome5203.cla_isu  
      where vcome5203.${var_ord}>='${ini_isu}' and vcome5203.${var_ord}<='${fin_isu}' AND COP_NOM='C' AND ent_sal<>0  
       and (fec_mov>=${des_fec_que} and fec_mov<=${has_fec_que}) and ${con_sql} `

      if (tip_reos == 'S')
        localWhere = localWhere + ` and pre_alm > 0 `
      localWhere = localWhere + ` 
      create table #res_pre (cla_tem char(30),vta_tem numeric(17,4),pre_tem numeric(17,4),ped_tem numeric(17,4),
      per_tem numeric(7,2),cte_tem int,ppv_tem numeric(17,4),exi_tem numeric(17,4),can_tem numeric(17,4)) `

      localWhere = localWhere + `
       ALTER TABLE #res_pre  ALTER COLUMN cla_tem CHAR(30) COLLATE Modern_Spanish_CI_AS NOT NULL 
        exec dbo.p_cal_pun_reo '${ini_isu}','${fin_isu}',${des_per},${has_per},'${alm_rep}',
        ${this.per_min.prop.Value},'${tip_reos}','${tip_afe}',${has_fec_que},${cal_reo},'${this.alm_afe.prop.Value}' 
      select *,exi_tem as exi_ini,ped_tem as ped_cte,ppv_tem as ped_pve, 
          (select COUNT(ndo_doc) from #result00 where cla_mov=#res.cla_isu and coa_tdo='C') as tot_fac, 
           (select max(can_cap) from #result00 where cla_mov=#res.cla_isu and coa_tdo='C') as max_vta 
            from  #res  join #res_pre on cla_isu=cla_tem 
            ${order} 
            drop table #res_pre 
            drop table #res 
            drop table #result00
          `

    }



    console.log(
      "sqlQuery =", localWhere
    );
    console.log(
      "sqlQuery =", localWhere)
    //return ` select top 1 * from ${this.vis_rep}  `;

    return `${localWhere}  `;


  }

} // End ThisForm

