//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisform
// Description : Insumos por documento ventas/compras gova
// Author : MGSR
// Creation : 2025/06/30
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
import { in_tcd_tcd } from '~/classes/Siavcom/reports/INV/in_tcd_tcd'
import { in_tdo_tdo } from '~/classes/Siavcom/reports/INV/in_tdo_tdo'
import { tip_for } from './tip_for'
import { for_cal } from './for_cal'
import { tip_inv } from './tip_inv'
import { por_inc } from './por_inc'

export class ThisForm extends reportInv {
  public in_tdo_tdo = new in_tdo_tdo()
  public in_tcd_tcd = new in_tcd_tcd()
  public tip_for = new tip_for()
  public for_cal = new for_cal()
  public tip_inv = new tip_inv()
  public por_inc = new por_inc()

  constructor() {
    super(1)  // inicializa la clase base
    this.tab_ord = 'vi_come5203'
    this.prop.Name = 'come3210'
    this.prop.Caption = "Insumos por documento"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come5203'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come5203gv'   // no incluir extencion jasper o jrxml
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
    this.in_tdo_tdo.prop.TabIndex = 1;
    this.in_tcd_tcd.prop.TabIndex = 2;
    this.des_fec.prop.TabIndex = 3;
    this.has_fec.prop.TabIndex = 4;
    this.alm_rep.prop.TabIndex = 5;
    this.tip_inv.prop.TabIndex = 6;
    this.tip_for.prop.TabIndex = 7;
    this.for_cal.prop.TabIndex = 8;
    this.por_inc.prop.TabIndex = 9;
    this.tip_for.prop.Visible = false;
    this.for_cal.prop.Visible = false;
    this.tip_for.prop.Disabled = true;
    this.for_cal.prop.Disabled = true;
    this.sep_fam.prop.TabIndex = 20;
    this.block[1].component = {
      [0]: this.in_tdo_tdo,
      [1]: this.in_tcd_tcd,
      [2]: this.des_fec,
      [3]: this.has_fec,
      [4]: this.alm_rep,
      [5]: this.tip_inv,
      [6]: this.tip_for,
      [7]: this.for_cal,
      [8]: this.por_inc
    }
    this.block[1].prop.Visible = true
    this.block[1].prop.Disabled = false
    this.block[1].title = 'Generales'
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false

    this.block[2].prop.Visible = false
    this.block[2].prop.Disabled = true

  }

  public override async init() {
    await super.init()
    this.var_ord.prop.Value = "";
    console.log(
      "===================>Init Report name=",
      this.prop.Name,
      "var_ord",
      this.var_ord.prop.Value, "parametros", this.Form.Params[0]
    );
    // asignamos informacion de acuerdo al parametro del programa
    this.in_tdo_tdo.prop.MultiSelect = true
    let par_for = this.Form.Params[0]
    par_for = par_for.replaceAll("´", "")
    if (par_for == 'VE')
      par_for = 'C'
    if (par_for == 'CO')
      par_for = 'C'
    if (par_for == "IN")
      this.in_tdo_tdo.prop.RowSource =
        ` select des_tdo,tdo_tdo,inv_tdo from now.loc_cometdo where inv_tdo <>'N'  union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo `
    else
      this.in_tdo_tdo.prop.RowSource =
        ` select des_tdo,tdo_tdo,inv_tdo from now.loc_cometdo where cop_nom='${par_for}' and nmo_tdo>0 union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo `

  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep = this.tip_rep.prop.Value;
    const tip_inv = this.tip_inv.prop.Value;
    const ini_isu = this.op_des_isu.prop.Value;
    const fin_isu = this.op_has_isu.prop.Value;
    const alm_rep = this.Form.alm_rep.prop.Value;
    var var_ord = this.var_ord.prop.Value;
    const ima_pge = this.Form.mPublic.ima_pge;
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    const in_tdo_tdo = this.in_tdo_tdo.prop.Value;
    const in_tcd_tcd = this.in_tcd_tcd.prop.Value;
    this.Form.con_rep = where;
    var pri_cla = 1,
      ult_cla = 29,
      pos_tom = 30,
      var_fam = ' ',
      que_fam = 'des_fa1 ';

    if (sep_fam == 1) {
      if (this.Form.op_has_fam.prop.Value < this.Form.op_des_fam.prop.Value || this.Form.op_has_fam.prop.Value.length == 0)
        this.Form.op_has_fam.prop.Value = "ZZZZZ";
      // nos traemos posicion de la familia
      const data = await this.Sql.localAlaSql(` select top 1 pri_cla,ult_cla,que_fam from now.loc_comefam where num_fam=${num_fam} `)
      pri_cla = data[0].pri_cla + 1
      pos_tom = data[0].ult_cla - pri_cla
      que_fam = data[0].que_fam + ' '
      var_fam = `substring(cla_isu,${pri_cla},${pos_tom})`  // variable para sustituir en query
      localWhere = ` (${var_fam}>='${op_des_fam}' and ${var_fam}<='${op_has_fam}') `;
    }


    // armamos fechas
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
      doc_imp = ' and ( tdo_tdo in (' + "'" + doc_imp + "'" + ') '
      tit_rep1 = tit_rep1 + 'Documentos: ' + des_tdo.replaceAll(",,", "")

    }
    if (in_tcd_tcd.trim() != "??") {
      doc_imp = doc_imp + ' and tcd_tcd in (' + "'" + in_tcd_tcd.replaceAll(",", "','") + "'" + ') '
      const data = await this.Sql.localAlaSql(` select des_tcd from now.loc_cometcd where tdo_tdo='${this.in_tdo_tdo.prop.Value}' and tcd_tcd='${this.in_tcd_tcd.prop.Value}'  `)
      tit_rep1 = tit_rep1 + ' ' + data[0].des_tcd.trim()
    }

    if (doc_imp.length > 2)
      doc_imp = doc_imp + ')'
    // armamos almacen
    var alm_sql = ''
    if (alm_rep.trim() != '??') {
      alm_sql = ` and alm_tda='${alm_rep}' `
      // generamos titulo del reporte
      const data = await this.Sql.localAlaSql(` select des_tda from now.loc_cometda where alm_tda='${alm_rep}' `)
      tit_rep1 = tit_rep1 + ' almacén ' + data[0].des_tda.trim()
    }
    else
      tit_rep1 = tit_rep1 + ' todos los almacenes '

    // verificamos si el programa es de inventarios tomamos fecha del movimiento

    if (this.Form.Params[0] == "´IN´")
      con_vis = `( (fec_mov>=${des_fec_que} AND fec_mov<=${has_fec_que}) and can_mov<>0 and tin_tti='P' ${doc_imp} ${alm_sql} ) `
    else
      con_vis = `( (FEC_DOC>=${des_fec_que} AND FEC_DOC<=${has_fec_que}) and can_mov<>0 and tin_tti='P' ${doc_imp} ${alm_sql} ) `

    // armamos formula si la hay
    var for_cal = this.for_cal.prop.Value
    var for_mul = "cst_isu"

    if (tip_inv == 1)					// gneera variables par calculo de costo promedio
      tit_rep1 = tit_rep1 + ' calculado en base al costo promedio'
    if (tip_inv == 2)					// gneera variables par calculo de costo standar
      tit_rep1 = tit_rep1 + ' calculado en base al costo estandar'
    if (tip_inv == 3)					// gneera variables par calculo de costo contable
      tit_rep1 = tit_rep1 + ' calculado en base al costo de reposición'
    if (tip_inv == 4)				//& genera variables par calculo de costo x formula
    {
      for_mul = for_cal
      tit_rep1 = tit_rep1 + ' calculado con formula: ' + for_mul
    }
    //
    var ins_sql = ""

    if (where.length > 0)
      where = ' AND ' + where
    if (localWhere.length > 0)
      localWhere = ' and ' + localWhere
    con_vis = ` where ${con_vis} ${localWhere} ${where} `

    ins_sql = `  exec p_cal_cos_pro_deh '${ini_isu}','${fin_isu}','${num_ord}';`

    if (in_tdo_tdo.trim() == "??") {

      ins_sql = ins_sql + `
 SELECT 
   tdo_tdo,Max(DES_TDO) as des_tdo,Max(INV_TDO) as inv_tdo,Max(cop_nom) as cop_nom,
   CLA_ISU AS cla_con,SUM(CAN_MOV) AS can_mov,SUM(COS_CAP) AS cos_cap,MAX(des_tcd) as des_tcd,
   sum(can_mov*(${for_mul})) as cos_for,MAX(fic_alm) as fic_alm,MAX(fiv_alm) as fiv_alm,
   SUM(PVE_MOV) AS pve_mov,MAX(prr_pro) as prr_pro INTO  #RESULTADO from ${this.vis_rep} ${con_vis}
   GROUP BY cla_isu,tdo_tdo 
`
    }
    else {
      ins_sql = ins_sql + ` SELECT Max(DES_TDO) as des_tdo,Max(INV_TDO) as inv_tdo,Max(cop_nom) as cop_nom,
    CLA_ISU AS cla_con,SUM(CAN_MOV) AS can_mov ,SUM(COS_CAP) AS cos_cap,MAX(des_tcd) as des_tcd,
    sum(can_mov*(${for_mul})) as cos_for,MAX(fic_alm) as fic_alm,MAX(fiv_alm) as fiv_alm,
    SUM(PVE_MOV) AS pve_mov,MAX(prr_pro) as prr_pro INTO  #RESULTADO from ${this.vis_rep} ${con_vis}
    GROUP BY cla_isu 
    `
    }
    var ord_vis = ''
    console.log('ord_vis=' + ord_vis)
    if (sep_fam == 1)    				//si no es reporte de separación de familias

      // utiliza la variable principal de orden y 
      // orden por clave y variable de orden	
      // y orden de la vista
      order = ` order by substring(cla_isu,${pri_cla},${pos_tom}),${var_ord}`

    if (ord_vis.length > 3)
      order = order + ',' + ord_vis
    this.Form.tit_rep = tit_rep1
    console.log('tit_rep=' + this.Form.tit_rep)
    if (sep_fam == 0)   //& si no es reporte de separación de familias o es MSSQL o Sybase
      ins_sql = ins_sql + `
    SELECT *,${que_fam} des_fam FROM #RESULTADO JOIN vi_come3201 vcome3201 ON #RESULTADO.CLA_CON=VCOME3201.CLA_ISU 
    ${order} `
    else
      ins_sql = ins_sql + ` SELECT substring(cla_isu,${pri_cla},${pos_tom}),${que_fam} des_fam,
       #RESULTADO.*,VCOME3201.* FROM #RESULTADO JOIN vi_come3201 VCOME3201 ON #RESULTADO.CLA_CON=VCOME3201.CLA_ISU 
      ${order} `

    ins_sql = ins_sql + ' drop table #resultado '
    console.log("where = ", where,
      "sqlQuery =",
      ` ${ins_sql}  `
    );
    return ` ${ins_sql}  `;

    //  return ` EXEC p_come3203 '${des_fec}','${has_fec}','${ini_isu}','${fin_isu}','${alm_rep}','${localWhere} ',${tip_rep},${tip_imp},'${var_ord}' `;


  }

} // End ThisForm

