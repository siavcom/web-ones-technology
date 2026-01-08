//////////////////////////////////////////////
// BaseClass : reportForm
// Class : Teams
// Description : Inventario o Kardex
// Author : MGSR
// Creation : 2024-01-15
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
    this.prop.Name = 'come3205'
    this.prop.Caption = "Inventario o Kardex"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3205'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3205'   // no incluir extencion jasper o jrxml
    this.tip_imp.prop.Visible = false   // Muestra general odetallado
    this.tip_imp.prop.Disabled = true
    this.tip_rep.prop.Visible = true    // Muestra general odetallado
    this.tip_rep.prop.Disabled = false
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.des_fec.prop.Visible = true;
    this.has_fec.prop.Disabled = false;
    this.op_des_isu.prop.Disabled = true;
    this.op_des_isu.prop.Visible = false;
    this.op_has_isu.prop.Disabled = true;
    this.op_has_isu.prop.Visible = false;
    this.alm_rep.prop.Visible = true;
    this.alm_rep.prop.Disabled = false;
    this.alm_rep.prop.MultiSelect = true;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.alm_rep,
      [1]: this.des_fec,
      [2]: this.has_fec
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

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    this.fields = [
      ['cla_isu', 'Clave ', "'' ", "'ZZZZZZZZZZZZ' "],
      ["des_isu", "Descripción ", "'' ", "'ZZZZZZZZZZZZZZZZZ'"],
      ["sku_isu", "SKU ", "'' ", "'ZZZZZZZZZZZZ'"]]
    this.var_ord.prop.Value = "cla_isu";
    this.ord_vis = "fec_mov,inv_tdo"

  }



  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep = this.tip_rep.prop.Value;
    const ini_isu = this.Form.des_dat.prop.Value;
    const fin_isu = this.Form.has_dat.prop.Value;
    const alm_rep = this.alm_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    this.Form.con_rep = where
    var tit_rep = '',
      var_des = '',
      var_des2 = '',
      var_des1 = '',
      num_ord = 'C',
      con_sql2 = '',
      con_sql1 = '',
      alm_mul = alm_rep;
    if (var_ord == 'des_isu')
      num_ord = 'D';
    if (var_ord == 'sku_isu')
      num_ord = 'S'

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
      order = order.replaceAll("order by ", "order by des_fam,");
      var_des = ` substring(#saldo.cla_isu,${pri_cla},${pos_tom}) `,
        var_des2 = ` substring(${this.vis_rep}.cla_isu,${pri_cla},${pos_tom}) `,
        var_des1 = ` substring(vi_come3201.cla_isu,${pri_cla},${pos_tom}) `
      con_sql1 = ` and (substring(${this.vis_rep}.cla_isu,${pri_cla},${pos_tom})>='${op_des_fam}' and substring(${this.vis_rep}.cla_isu,${pri_cla},${pos_tom})<='${op_has_fam}')`;

    }

    else {
      if (num_ord == 'C')
        this.ord_vis = ` #saldo.${var_ord} `
      var_des = ` #saldo.${var_ord} `
      var_des2 = `${this.vis_rep}.${var_ord} `
      var_des1 = ` vi_come3201.${var_ord} `
      //        var_des1=`vi_come3201.${var_ord} `
    }

    con_sql2 = ` ${where} ${con_sql2} `
    where = where.replaceAll(var_ord, var_des)

    con_sql1 = ` ${where} ${con_sql1} `

    // generamos las condiciones para la vista
    {
      var
        con_sql = ` FEC_MOV>='${des_fec}' AND FEC_MOV<='${has_fec}' `,
        sql_alm = 'null'  // variable para el almacen(s)

    }
    console.log(alm_mul)
    if (alm_mul != '?? ') {
      sql_alm = alm_mul
      alm_mul = alm_mul.replaceAll(",", "','")
      console.log('sql_alm=' + sql_alm)
      con_sql = con_sql + ' and alm_tda in (' + "'" + alm_mul + "'" + ') '
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
      con_sql = con_sql + ` and ave_tda=1 `;
      tit_rep = tit_rep + ' Todos'
    }
    this.Form.tit_rep = tit_rep

    var fec_exi = addDay(this.des_fec.prop.Value, -1);
    fec_exi = fec_exi.replaceAll("-", "")
    console.log('fec_exi=', fec_exi)
    var ins_sql =
      `  exec p_cal_cos_pro_deh '${ini_isu}','${fin_isu}','${num_ord}'; 
        select distinct ${this.vis_rep}.cla_isu as cla_pro into #datos from ${this.vis_rep} 
        where tin_tti='P' and ${con_sql2} 
        SELECT dbo.F_CAL_EXI_GEN(CLA_pro,0,'${fec_exi}',${sql_alm},NULL,NULL,NULL) as exi_ini,
        dbo.F_cal_cos_gen(cla_pro,'${fec_exi}',${sql_alm}) as cex_ini,cla_pro cla_isu,des_isu,
        sku_isu,un1_isu,${que_fam} as des_fam into #saldo from #datos 
        join vi_come3201 on #datos.cla_pro=vi_come3201.cla_isu 
        select #saldo.cla_isu cla_pro,#saldo.exi_ini,#saldo.cex_ini,
        isnull(${this.vis_rep}.cla_isu,#saldo.cla_isu) cla_isu,isnull(${this.vis_rep}.un1_isu,#saldo.un1_isu) un1_isu,
        isnull(${this.vis_rep}.des_isu,#saldo.des_isu) des_isu,isnull(${this.vis_rep}.inv_tdo,'N') inv_tdo,
        tdo_tdo,des_tdo,ndo_doc,fec_mov,alm_tda,des_fam,
        isnull(${this.vis_rep}.can_mov,0) can_mov,isnull(${this.vis_rep}.cos_cap,0) cos_cap,
        ${this.vis_rep}.des_tda from #saldo left outer join ${this.vis_rep} ON #saldo.cla_isu=${this.vis_rep}.cla_isu and 
        ${con_sql} and tin_tti='P' 
        ${order}; drop table #datos  drop table #saldo `


    console.log(
      "sqlQuery =", ins_sql
    );
    //return `   select top 10 * from ${this.vis_rep}  `;
    return `${ins_sql}  `;


  }

} // End ThisForm

