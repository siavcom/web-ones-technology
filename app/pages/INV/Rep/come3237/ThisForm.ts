//////////////////////////////////////////////
// BaseClass : reportForm
// Class : Teams
// Description : Puntos de reorden considerando almacén en tránsito
// Author : MGSR
// Creation : 2025/05/05
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
export class ThisForm extends reportInv {
  public aba_min = new aba_min()
  public arr_max = new arr_max()
  public co1_exi = new co1_exi()
  public co2_exi = new co2_exi()
  public tra_exi = new tra_exi()
  public cte_ped = new cte_ped()
  public ini_exi = new ini_exi()
  public pve_ped = new pve_ped()

  constructor() {
    super(3)  // inicializa la clase base
    this.tab_ord = 'man_comeisu'
    this.prop.Name = 'come3237'
    this.prop.Caption = "Puntos de reorden considerando almacén en tránsito"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3206'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3237'   // no incluir extencion jasper o jrxml
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
      [0]: this.sep_fam,
      [1]: this.num_fam,
      [2]: this.op_des_fam,
      [3]: this.op_has_fam
    }
    this.block[3].prop.Visible = true
    this.block[3].prop.Disabled = false
    this.block[3].title = 'Familias'

    this.block[4].prop.Visible = false
    this.block[4].prop.Disabled = true



    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    this.fields = [
      ['cla_isu', 'Clave ', "'' ", "'ZZZZZZZZZZZZ' "],
      ["des_isu", "Descripción ", "'' ", "'ZZZZZZZZZZZZZZZZZ'"],
      ["sku_isu", "SKU ", "'' ", "'ZZZZZZZZZZZZ'"]]
    this.var_ord.prop.Value = "cla_isu";
    this.ord_vis = "fec_mov,inv_tdo"

  }

  public override async init() {
    await super.init()
    this.has_fec.prop.Value = this.Form.mPublic.fpo_pge;
    this.des_fec.prop.Value = addDay(this.has_fec.prop.Value, -1);

    console.log(
      "===================>Init Report name=",
      this.prop.Name,
      "var_ord",
      this.var_ord.prop.Value,
      this.des_fec.prop.Value = this.Form.mPublic.fpo_pge
    );

  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const des_fec = dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const ini_isu = this.Form.des_dat.prop.Value;
    const fin_isu = this.Form.has_dat.prop.Value;
    const alm_rep = this.alm_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    const aba_min = this.aba_min.prop.Value
    const arr_max = this.arr_max.prop.Value
    this.Form.con_rep = where
    var tit_rep2 = '',
      tit_rep = '',
      var_des = '',
      var_des2 = '',
      var_des1 = '',
      num_ord = 'C',
      con_sql2 = '',
      con_sql1 = '',
      alm_mul = alm_rep,
      alm_tra = '',
      des_tra = '',
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
    {
      var
        con_sql = '',
        sql_alm = 'null'  // variable para el almacen(s)

    }
    console.log(alm_mul)
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
        let data = await this.Sql.localAlaSql(` select des_tda from now.loc_cometda where alm_tda='${alm_tda}' `)
        des_tda = des_tda + "," + data[0].des_tda.trim()
        data = await this.Sql.localAlaSql(` select alm_tra from now.loc_cometda where alm_tda='${alm_tda}' `)
        if (data[0].alm_tra.trim().length > 0) {
          alm_tra = data[0].alm_tra
          data = await this.Sql.localAlaSql(` select des_tra from now.loc_cometda where alm_tda='${alm_tda}' `)
          des_tra = data[0].des_tra.trim()
        }
      }
      tit_rep = tit_rep + des_tda.replaceAll(",,", "")
      if (alm_tra.trim().length > 0)
        tit_rep = tit_rep + ' Almacén en tránsito: ' + des_tra.trim() + ' (' + alm_tra + ')'

    }
    else {
      con_sql = ` ave_tda=1 `;
      tit_rep = tit_rep + ' Todos'
    }

    var fec_exi = has_fec.replaceAll("-", "")
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
    var ins_sql = `  if OBJECT_ID('tempdb..#res_pre') is not null  drop table #res_pre 
  	  if OBJECT_ID('tempdb..#result00') is not null  drop table #result00 
	    if OBJECT_ID('tempdb..#tempo01') is not null  drop table #tempo01
	    if OBJECT_ID('tempdb..#tempo02') is not null  drop table #tempo02   `
    ins_sql = `
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
	 group by cla_isu order by cla_isu 
	 select *,ped_cte as ped_tem,ped_pve as ppv_tem,pre_alm as pre_tem,min_alm as min_tem,max_alm as max_tem,exi_ini as exi_tem,
	exi_ini as vta_tem,0 as tot_fac,${var_exi} from  #tempo02  order by ${ord_vis}
	 drop table #tempo02 drop table #tempo01
  `

    console.log(
      "sqlQuery =", ins_sql
    );
    //return `   select top 10 * from ${this.vis_rep}  `;
    return `${ins_sql}  `;


  }

} // End ThisForm

