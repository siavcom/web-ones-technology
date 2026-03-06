//////////////////////////////////////////////
// BaseClass : reportForm
// Class : Teams
// Description : Puntos de reorden considerando almacén en tránsito y promedios de venta
// Author : MGSR
// Creation : 2026/02/24
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
import { aba_min } from './aba_min'
import { arr_max } from './arr_max'
import { co1_exi } from './co1_exi'
import { co2_exi } from './co2_exi'
import { cte_ped } from './cte_ped'
import { ini_exi } from './ini_exi'
import { pve_ped } from './pve_ped'
import { tra_exi } from './tra_exi'
import { in_tdo_tdo } from '~/classes/Siavcom/reports/INV/in_tdo_tdo'
import { in_tcd_tcd } from '~/classes/Siavcom/reports/INV/in_tcd_tcd'
import { addMonth, month } from '~/composables/Functions'
export class ThisForm extends reportInv {
  public aba_min = new aba_min()
  public arr_max = new arr_max()
  public co1_exi = new co1_exi()
  public co2_exi = new co2_exi()
  public tra_exi = new tra_exi()
  public cte_ped = new cte_ped()
  public ini_exi = new ini_exi()
  public pve_ped = new pve_ped()
  public in_tdo_tdo = new in_tdo_tdo()
  public in_tcd_tcd = new in_tcd_tcd()
  constructor() {
    super(4)  // inicializa la clase base
    this.tab_ord = 'man_comeisu'
    this.prop.Name = 'come3242'
    this.prop.Caption = "Puntos de reorden con promedio de ventas"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3206'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3242'   // no incluir extencion jasper o jrxml
    this.tip_imp.prop.Visible = false   // Muestra general odetallado
    this.tip_imp.prop.Disabled = true
    this.tip_rep.prop.Visible = false    // Muestra general odetallado
    this.tip_rep.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.des_fec.prop.Visible = false;
    this.has_fec.prop.Visible = true;
    this.des_fec.prop.Disabled = true;
    this.has_fec.prop.Disabled = false;
    this.op_des_isu.prop.Disabled = true;
    this.op_des_isu.prop.Visible = false;
    this.op_has_isu.prop.Disabled = true;
    this.op_has_isu.prop.Visible = false;
    this.alm_rep.prop.Visible = true;
    this.alm_rep.prop.Disabled = false;
    this.alm_rep.prop.MultiSelect = true;
    this.in_tdo_tdo.prop.Visible = true;
    this.in_tdo_tdo.prop.Disabled = false;
    this.in_tdo_tdo.prop.MultiSelect = true;
    this.has_fec.prop.TabIndex = 1;
    this.alm_rep.prop.TabIndex = 2;
    this.aba_min.prop.TabIndex = 3;
    this.arr_max.prop.TabIndex = 4;
    this.ini_exi.prop.TabIndex = 5;
    this.pve_ped.prop.TabIndex = 6;
    this.cte_ped.prop.TabIndex = 7;
    this.tra_exi.prop.TabIndex = 8;
    this.co1_exi.prop.TabIndex = 9;
    this.co2_exi.prop.TabIndex = 10;
    this.sep_fam.prop.TabIndex = 20;
    this.in_tdo_tdo.prop.TabIndex = 11;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.has_fec,
      [1]: this.alm_rep
    }

    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'

    this.block[1].component = {
      [0]: this.aba_min,
      [1]: this.arr_max
    }
    this.block[1].prop.Visible = true
    this.block[1].prop.Disabled = false
    this.block[1].prop.title = 'Solo insumos con: '

    this.block[2].component = {
      [0]: this.ini_exi,
      [1]: this.pve_ped,
      [2]: this.cte_ped,
      [3]: this.tra_exi,
      [4]: this.co1_exi,
      [5]: this.co2_exi
    }
    this.block[2].prop.Visible = true;
    this.block[2].prop.Disabled = false;
    this.block[2].prop.title = 'Considerando: '

    this.block[3].component = {
      [0]: this.in_tdo_tdo
    }
    this.block[3].prop.Visible = true
    this.block[3].prop.Disabled = false
    this.block[3].title = 'Información de ventas'

    this.block[4].component = {
      [0]: this.sep_fam,
      [1]: this.num_fam,
      [2]: this.op_des_fam,
      [3]: this.op_has_fam
    }
    this.block[4].prop.Visible = true
    this.block[4].prop.Disabled = false
    this.block[4].title = 'Familias'




    this.block[5].prop.Visible = false
    this.block[5].prop.Disabled = true



    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    this.fields = [
      ['cla_isu', 'Clave ', "'' ", "'ZZZZZZZZZZZZ' "],
      ["des_isu", "Descripción ", "'' ", "'ZZZZZZZZZZZZZZZZZ'"],
      ["sku_isu", "SKU ", "'' ", "'ZZZZZZZZZZZZ'"]]
    this.var_ord.prop.Value = "cla_isu";
    this.ord_vis = "fec_mov,inv_tdo"

  }

  override async init() {
    await super.init()
    //    this.has_fec.prop.Value = Public.value.fpo_pge;
    //   this.des_fec.prop.Value = addDay(this.has_fec.prop.Value, -1);
    /*    this.ini_exi.prop.Value = 1;
        this.pve_ped.prop.Value = 1;
        this.cte_ped.prop.Value = 1;
        this.tra_exi.prop.Value = 1;
        this.co1_exi.prop.Value = 1;
        this.co2_exi.prop.Value = 1;
    */
    console.log(
      "===================>Init Report name=",
      this.prop.Name,
      "var_ord",
      this.var_ord.prop.Value,
      //     this.des_fec.prop.Value = this.Form.mPublic.fpo_pge
    );

  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public override async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const has_fec = dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    var alm_rep = this.alm_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    const aba_min = this.aba_min.prop.Value
    const arr_max = this.arr_max.prop.Value
    var in_tdo_tdo = this.in_tdo_tdo.prop.Value
    var in_tcd_tcd = this.in_tcd_tcd.prop.Value
    this.Form.con_rep = where
    var tit_rep2 = '',
      tit_rep = '',
      num_ord = 'C',
      con_sql2 = '',
      con_sql1 = '',
      alm_mul = alm_rep,
      alm_tra = ' ',
      des_tra = ' ',
      ord_vis = var_ord;
    this.Form.ord_rep = "1";
    if (var_ord == 'des_isu')
      this.Form.ord_rep = "2"
    if (var_ord == 'sku_isu')
      this.Form.ord_rep = "3"

    if (var_ord == 'des_isu' || var_ord == 'sku_isu')
      ord_vis = var_ord + ",cla_isu";
    if (aba_min == 1 && arr_max == 1)
      tit_rep2 = ' Solo insumos con existencia crítica en puntos de reorden máximos y mínimos '
    if (aba_min == 1 && arr_max == 0)
      tit_rep2 = ' Solo insumos con existencia menor a punto mínimo'
    if (arr_max == 1 && aba_min == 0)
      tit_rep2 = ' Solo insumos con existencia mayor o igual a punto máximo '

    var pri_cla = 0,
      pos_tom = 30,
      que_fam = "",
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
      con_sql2 = ` and (${var_fam}>='${op_des_fam}' and ${var_fam}<='${op_has_fam}') `;
      ord_vis = "des_fam," + ord_vis;
      con_sql1 = ` (substring(cla_isu,${pri_cla},${pos_tom})>='${op_des_fam}' and substring(cla_isu,${pri_cla},${pos_tom})<='${op_has_fam}')`;

    }

    // generamos las condiciones para la vista

    var con_sql = ' ', sql_alm = alm_mul  // variable para el almacen(s)

    console.log(alm_mul, alm_rep);
    console.log('sql_alm=' + sql_alm)
    con_sql = con_sql + ' alm_tda in (' + "'" + alm_mul + "'" + ') '
    sql_alm = "'" + sql_alm + "'"
    // obtenemos la descripcion de los almacenes seleccionados   
    var alm_tda = alm_mul, des_tda = ' '
    const data = await localAlaSql(` select des_tda,alm_tra,des_tra from now.loc_cometda where alm_tda='${alm_rep}' `)

    des_tda = des_tda + data[0].des_tda
    if (data[0].alm_tra.trim().length > 0) {
      alm_tra = data[0].alm_tra
      des_tra = data[0].des_tra.trim()
    }
    tit_rep = tit_rep + des_tda
    if (alm_tra.trim().length > 0)
      tit_rep = tit_rep + ' Almacén en tránsito: ' + des_tra.trim() + ' (' + alm_tra + ')'

    // armamos documentos y  clasificacion
    var doc_imp = '', tit_rep1 = ''
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
      console.log('doc_imp=', doc_imp, 'in_tdo_tdo=', in_tdo_tdo)
    }
    /*    if (in_tcd_tcd.trim() != "??" || in_tcd_tcd.trim().length>0 ) {
          doc_imp = doc_imp + ' and tcd_tcd in (' + "'" + in_tcd_tcd.replaceAll(",", "','") + "'" + ') '
          const data = await this.Sql.localAlaSql(` select des_tcd from now.loc_cometcd where tdo_tdo='${this.in_tdo_tdo.prop.Value}' and tcd_tcd='${this.in_tcd_tcd.prop.Value}'  `)
          tit_rep1 = tit_rep1 + ' ' + data[0].des_tcd.trim()
        }
    */    // armamos fechas para meses de venta 
    var fec_fec = new Date(this.Form.has_fec.prop.Value)
    console.log('fec_fec=', fec_fec)
    //    fec_fec = new Date(2022,12,31)
    //   var n_mes = fec_fec.slice(5, 7)
    //   fec_fec.setDate(fec_fec.getDate() - fec_fec.getDate())
    fec_fec.setDate(fec_fec.getDate() - fec_fec.getDate())
    console.log('fec_fec=', fec_fec)
    var tot_mes = 6
    //    fec_ini.setDate(fec_ini.getMonth() - 6)
    //    fec_fec.setDate(fec_fec.getDate() - 180)
    fec_fec.setDate(fec_fec.getDate() - (fec_fec.getDate() - 1)) //   i = fec_fin.getDate() 
    console.log('fec_fec=', fec_fec)
    var vta1 = '', vta2 = '', vta3 = '', vta4 = '', vta5 = '', vta6 = '',
      enc_mes = ''
    i = 1, j = 6
    for (let i = 1; i <= j; i += 1) {
      enc_mes = enc_mes + left(dateToSql(fec_fec), 6) + ','
      if (i == 1)
        vta6 = upper(fec_fec.toLocaleDateString('es-ES', { month: 'short' })) + '_' + left(dateToSql(fec_fec), 4)
      if (i == 2)
        vta5 = upper(fec_fec.toLocaleDateString('es-ES', { month: 'short' })) + '_' + left(dateToSql(fec_fec), 4)
      if (i == 3)
        vta4 = upper(fec_fec.toLocaleDateString('es-ES', { month: 'short' })) + '_' + left(dateToSql(fec_fec), 4)
      if (i == 4)
        vta3 = upper(fec_fec.toLocaleDateString('es-ES', { month: 'short' })) + '_' + left(dateToSql(fec_fec), 4)
      if (i == 5)
        vta2 = upper(fec_fec.toLocaleDateString('es-ES', { month: 'short' })) + '_' + left(dateToSql(fec_fec), 4)
      if (i == 6)
        vta1 = upper(fec_fec.toLocaleDateString('es-ES', { month: 'short' })) + '_' + left(dateToSql(fec_fec), 4)
      //     fec_fec.setDate(fec_fec.getMonth() + 1)
      fec_fec.setDate(fec_fec.getDate() - (fec_fec.getDate()))

      console.log('enc_mes=', enc_mes, 'fec_fec=', fec_fec)
    }
    console.log('fec_fec=', fec_fec)
    console.log('vta1', vta1, vta2, vta3, vta4, vta5, vta6)


    // generamos condicion de vista para ventas
    var con_vis_doc = ''
    if (where.trim().length > 0)
      con_vis_doc = con_vis_doc + ' and '
    con_vis_doc = con_vis_doc + where
    if (con_sql1.trim().length > 0)
      con_vis_doc = con_vis_doc + ' and '
    con_vis_doc = con_vis_doc + con_sql1
    console.log('con_vis_doc=', con_vis_doc)
    var fec_exi = has_fec.replaceAll("-", "")
    //* obtenemos las ventas de los meses de acuerdo al numero de meses seleccionados y documentos

    var ins_sql = ` 
    declare @enca varchar(250),@fec_ini datetime,@fec_fin datetime,@n_mes int
		set @fec_fin='${fec_exi}'
    set @fec_fin=dateadd(d,-day(@fec_fin),@fec_fin)
    set @fec_ini=dateadd(m,-6,@fec_fin)
	  set @n_mes=MONTH(@fec_ini)
    while @n_mes=month(@fec_ini)
		begin 
		    set @fec_ini=DATEADD(d,1,@fec_ini)
		end
    set @n_mes=1
    set @enca=CAST((year(@fec_ini)*100)+MONTH(@fec_ini) as char(6))+','+CAST(@n_mes as char(1))+','
    while (@n_mes<6)
    begin
	    set @enca=@enca+CAST((year(DATEADD(m,@n_mes,@fec_ini))*100)+MONTH(DATEADD(m,@n_mes,@fec_ini)) as char(6))+','+CAST(@n_mes+1 as char(1))+','
	    set @n_mes=@n_mes+1
    end
    SELECT cla_isu cla_vta,SUM(can_mov*car_abo) can_mov,cast((Year(fec_doc)*100)+Month(fec_doc) as CHAR(6)) per_est,
	  @enca enca,0 num_col into #ventas0 from vcome5217 where ( FEC_doc>=@fec_ini AND FEC_doc<=@fec_fin )  
  	${con_vis_doc} ${doc_imp}
	 Group By cla_isu,cast((Year(fec_doc)*100)+Month(fec_doc) as CHAR(6)) with rollup 
	 update #ventas0 set num_col=cast((case when CHARINDEX(per_est,enca)>0 then substring(enca,CHARINDEX(per_est,enca)+7,1) else 0 end) as int)
	 delete from #ventas0 where cla_vta is null 
   select cla_vta,
    SUM(case num_col when 1 then can_mov else 0 end) vta_001,SUM(case num_col when 2 then can_mov else 0 end) vta_002,
    SUM(case num_col when 3 then can_mov else 0 end) vta_003,SUM(case num_col when 4 then can_mov else 0 end) vta_004,
    SUM(case num_col when 5 then can_mov else 0 end) vta_005,SUM(case num_col when 6 then can_mov else 0 end) vta_006,
    SUM(case num_col when 0 then can_mov else 0 end) vta_tot,SUM(case num_col when 0 then can_mov/6 else 0 end) vta_pro
    into #ventas from #ventas0
    group by cla_vta
   
   `
    // obtenemos puntos de reorden de otros almacenes 01,20,21,86
    ins_sql = ins_sql + `select cla_isu,max_alm max_01,
	dbo.F_CAL_pdo_gen(CLA_ISU,'${fec_exi}','01 ','C') as cte_01, 
	dbo.F_CAL_EXI_GEN(CLA_ISU,0,'${fec_exi}','01 ',NULL,NULL,NULL) as exi_01, 
	0 as max_20,0 as cte_20,0 as exi_20,0 as max_21,0 as cte_21,0 as exi_21,0 as max_86,0 as cte_86,0 as exi_86 
	 into #tem011 from  vcome3206 where alm_tda='01' ${con_sql2} and pre_alm > 0 
	 union select cla_isu,0,0,0,max_alm,
	dbo.F_CAL_pdo_gen(CLA_ISU,'${fec_exi}','20 ','C'), 
	dbo.F_CAL_EXI_GEN(CLA_ISU,0,'${fec_exi}','20 ',NULL,NULL,NULL), 
	0,0 as cte_21,0 as exi_21,0,0 as cte_86,0 as exi_86  from  vcome3206 where alm_tda='20' ${con_sql2} and pre_alm > 0 
	 union select cla_isu,0,0,0,0,0,0,max_alm,
	dbo.F_CAL_pdo_gen(CLA_ISU,'${fec_exi}','21 ','C'), 
	dbo.F_CAL_EXI_GEN(CLA_ISU,0,'${fec_exi}','21 ',NULL,NULL,NULL), 
	0,0 as cte_86,0 as exi_86  from  vcome3206 where alm_tda='21' ${con_sql2} and pre_alm > 0 
	 union select cla_isu,0,0,0,0,0,0,0,0,0,max_alm,
	dbo.F_CAL_pdo_gen(CLA_ISU,'${fec_exi}','86 ','C'), 
	dbo.F_CAL_EXI_GEN(CLA_ISU,0,'${fec_exi}','86 ',NULL,NULL,NULL) 
	 from  vcome3206 where  alm_tda='86' ${con_sql2}  and pre_alm > 0 
	select cla_isu cla_alm,SUM(exi_01-cte_01-max_01) exe_01,SUM(exi_20-cte_20-max_20) exe_20,
	SUM(exi_21-cte_21-max_21) exe_21,SUM(exi_86-cte_86-max_86) exe_86 
	 into #otros_alms from #tem011 group by cla_isu 
`
    // obtenemos puntos de reorden de almacen solicitado

    var var_exi = ''
    if (this.ini_exi.prop.Value == 1)
      var_exi = "exi_ini+"
    if (this.pve_ped.prop.Value == 1)
      var_exi = var_exi + "ped_pve+"
    if (this.tra_exi.prop.Value == 1)
      var_exi = var_exi + "exi_tra+"
    if (this.co1_exi.prop.Value == 1)
      var_exi = var_exi + "exi_cor+"
    if (this.co2_exi.prop.Value == 1)
      var_exi = var_exi + "exi_089+"
    var_exi = var_exi + '+'
    if (this.cte_ped.prop.Value == 1)
      var_exi = var_exi + "-ped_cte"
    var_exi = var_exi.replaceAll("++", "") + " tot_exi "
    tit_rep2 = tit_rep2 + ', considerando total existencia: ' + var_exi.replace('exi_ini', 'Existencia física').replace('ped_pve', 'Pedidos proveedores')
      .replace('exi_tra', 'Existencia en tránsito').replace('exi_cor', 'Existencia Corp. GDL')
      .replace('exi_089', 'Existencia Corp. AGS').replace(
        'ped_cte', 'Pedidos clientes').replace('tot_exi', '')
    this.Form.tit_rep = tit_rep2 + ' ' + tit_rep
    if (where.trim().length > 0)
      con_sql = con_sql + ' and '
    con_sql = con_sql + where
    if (con_sql1.trim().length > 0)
      con_sql = con_sql + ' and '
    con_sql = con_sql + con_sql1
    console.log('fec_exi=', fec_exi, 'con_aql=', con_sql)
    ins_sql = ` 
       if OBJECT_ID('tempdb..#otros_alms') is not null  drop table #otros_alms
	    if OBJECT_ID('tempdb..#tempo02') is not null  drop table #tempo02
      if OBJECT_ID('tempdb..#tempo01') is not null  drop table #tempo01 
      if OBJECT_ID('tempdb..#tem011') is not null  drop table #tem011 
      if OBJECT_ID('tempdb..#ventas0') is not null  drop table #ventas0  
      if OBJECT_ID('tempdb..#ventas') is not null  drop table #ventas  
      if OBJECT_ID('tempdb..#final') is not null  drop table #final
      if OBJECT_ID('tempdb..#resultado') is not null  drop table #resultado `+ ins_sql
    ins_sql = ins_sql + `
  select cla_isu,des_isu,pre_alm,min_alm,max_alm,un1_isu,ubi_alm,cpe_alm,alm_tda,
	dbo.F_CAL_pdo_gen(CLA_ISU,'${fec_exi}',alm_tda,'P') as ped_pve,
	dbo.F_CAL_pdo_gen(CLA_ISU,'${fec_exi}',alm_tda,'C') as ped_cte, `
    if (alm_tra.trim().length > 0)
      ins_sql = ins_sql + `dbo.F_CAL_EXI_GEN(CLA_ISU,0,'${fec_exi}','${alm_tra}',NULL,NULL,NULL)`
    else
      ins_sql = ins_sql + `0`
    ins_sql = ins_sql + ` as exi_tra, 
	dbo.F_CAL_EXI_GEN(CLA_ISU,0,'${fec_exi}','88 ',NULL,NULL,NULL) as exi_cor, 
	dbo.F_CAL_EXI_GEN(CLA_ISU,0,'${fec_exi}','89 ',NULL,NULL,NULL) as exi_089, 
	dbo.F_CAL_EXI_GEN(CLA_ISU,0,'${fec_exi}',alm_tda,NULL,NULL,NULL) as exi_ini,isnull(sku_isu,' ') sku_isu,
  ${que_fam} as des_fam
	 into #tempo01 from  vi_come3206 where ${con_sql} and pre_alm > 0 order by ${ord_vis}
	 select cla_isu,SUM(pre_alm) as pre_alm,SUM(min_alm) as min_alm,SUM(max_alm) as max_alm,MAX(un1_isu) as un1_isu,MAX(cpe_alm) as cpe_alm,
	 MAX(des_isu) as des_isu,MAX(ubi_alm) as ubi_alm,SUM(ped_pve) as ped_pve,SUM(ped_cte) as ped_cte,SUM(exi_ini) as exi_ini,MAX(sku_isu) as 
	sku_isu,SUM(exi_tra) as exi_tra,SUM(exi_cor) as exi_cor,SUM(exi_089) as exi_089,max(des_fam) des_fam into #tempo02 from #tempo01 
	 group by cla_isu 
	 select *,
	  exi_ini as cal_exi,exi_ini as vta_tem,0 as tot_fac,${var_exi},
    floor(vta_pro+.9) pro_vta,floor(vta_pro+.9)*2  vta_max,
    ${aba_min} aba_min,${arr_max} arr_max, 0 as imp_mmm
	  into #resultado from  #tempo02  
    left outer join #ventas on cla_vta=cla_isu 
    left outer join #otros_alms on cla_alm=cla_isu 
    update #resultado set imp_mmm=case when (aba_min=1 and tot_exi<=min_alm) or 
			(arr_max=1 and tot_exi>=max_alm) or (aba_min=0 and arr_max=0) then 1 else 0 end
    delete from #resultado where imp_mmm=0
    select *,case when (aba_min+arr_max)>0 then  1 else 0 end col_exi,
		 case when aba_min=1 then 1 else 0 end col_min,case when arr_max=1 then 1 else 0 end col_max,
    case when (cal_exi+ped_pve-ped_cte)>max_alm then cal_exi+ped_pve-ped_cte-max_alm else 0 end excedente,
    case when (max_alm+ped_cte)-(cal_exi+ped_pve+exi_tra)>0 then (max_alm+ped_cte)-(cal_exi+ped_pve+exi_tra) else 0 end faltante,
    case when (max_alm+ped_cte)-(cal_exi+ped_pve+exi_tra)-exi_cor-exi_089>0 then 
      (max_alm+ped_cte)-(cal_exi+ped_pve+exi_tra)-exi_cor-exi_089 else 0 end pedir_proveedor
	  into #final from #resultado
    select cla_isu clave,des_isu descripcion,un1_isu unidad,cast(cal_exi as numeric(9)) existencia,
    cast(tot_exi as numeric(9)) exis_final,min_alm minimo,
    max_alm maximo,isnull(pro_vta,0) MIN_N,isnull(vta_max,0) MAX_N,excedente,cast(ped_cte as numeric(9)) pedido_cte,cast(ped_pve as numeric(9)) pedido_pve,
    cast(exi_tra as numeric(9)) TRANSITO,faltante,cast(exi_cor as numeric(9)) CORPG,cast(exi_089 as numeric(9)) CORPA,pedir_proveedor PEDIR,
    cast(isnull(vta_001,0) as numeric(9)) ${vta1},cast(isnull(vta_002,0) as numeric(9)) ${vta2},
    cast(isnull(vta_003,0) as numeric(9)) ${vta3},cast(isnull(vta_004,0) as numeric(9)) ${vta4},
    cast(isnull(vta_005,0) as numeric(9)) ${vta5},cast(isnull(vta_006,0) as numeric(9)) ${vta6},
    cast(isnull(vta_tot,0) as numeric(9)) TOTAL_VTAS,isnull(pro_vta,0) PROMEDIO_MENSUAL,
    cast(case when exe_01 <0 then 0 else exe_01 end as numeric(9)) EXCEDENTE_GDL,
    cast(case when exe_20 <0 then 0 else exe_20 end as numeric(9))  EXCEDENTE_AGS,
    cast(case when exe_21 <0 then 0 else exe_21 end as numeric(9))  EXCEDENTE_COL,
    cast(case when exe_86 <0 then 0 else exe_86 end as numeric(9))  EXCEDENTE_SJR,
    @enca encac,@fec_fin fec_fin,@fec_ini fec_ini,
    cast(isnull(vta_001,0) as numeric(9)) vta1,cast(isnull(vta_002,0) as numeric(9)) vta2,
    cast(isnull(vta_003,0) as numeric(9)) vta3,cast(isnull(vta_004,0) as numeric(9)) vta4,
    cast(isnull(vta_005,0) as numeric(9)) vta5,cast(isnull(vta_006,0) as numeric(9)) vta6,
    col_exi,col_min,col_max

    from #final
    order by ${ord_vis} 
	  drop table #tempo02 drop table #tempo01 drop table #ventas0 drop table #ventas
    drop table #otros_alms drop table #tem011 drop table #final drop table #resultado
   `
    console.log(
      "sqlQuery =", ins_sql
    );
    // return `   select top 10 * from ${this.vis_rep}  `;
    return `${ins_sql}  `;


  }

} // End ThisForm

