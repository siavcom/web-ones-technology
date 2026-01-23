//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : thisForm
// Description : comparativo de ventas/compras mensuales
// @author: MGSR
// Creation : 2025-07-11
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";
import { tip_sel } from "./tip_sel";
import { per_act } from "./per_act";
import { imp_uni } from "./imp_uni";
import { des_cla } from "./des_cla";
import { has_cla } from "./has_cla";
import { des_ven } from "./des_ven";
import { has_ven } from "./has_ven";
export class ThisForm extends reportVtas {
  public tip_sel = new tip_sel()
  public imp_uni = new imp_uni()
  public per_act = new per_act()
  public des_cla = new des_cla()
  public has_cla = new has_cla()
  public des_ven = new des_ven()
  public has_ven = new has_ven()
  constructor() {
    super(3); // inicializa la clase base
    this.tab_ord = "man_comenom";
    this.prop.Name = "come5217";
    this.prop.Caption = "Comparativo mensual de ventas/compras ";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5217"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come5217"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false; // Muestra general o detallado
    this.tip_rep.prop.Disabled = true;
    this.des_fec.prop.Visible = false;
    this.des_fec.prop.Disabled = true;
    this.has_fec.prop.Visible = false;
    this.has_fec.prop.Disabled = true;
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.alm_rep.prop.Visible = false
    this.alm_rep.prop.Disabled = true
    this.tip_imp.prop.Visible = true;
    this.tip_imp.prop.Disabled = false;
    this.sep_fam.prop.Visible = true;
    this.sep_fam.prop.Disabled = false;
    this.op_tdo_tdo.prop.MultiSelect = true;
    this.op_tdo_tdo.prop.TabIndex = 1
    this.op_tcd_tcd.prop.TabIndex = 2
    this.per_act.prop.TabIndex = 3
    this.des_cla.prop.TabIndex = 4
    this.has_cla.prop.TabIndex = 5
    this.des_ven.prop.TabIndex = 6
    this.has_ven.prop.TabIndex = 7
    this.tip_sel.prop.TabIndex = 8
    this.tip_imp.prop.TabIndex = 12
    this.imp_uni.prop.TabIndex = 13
    this.sep_fam.prop.TabIndex = 14
    // definicion de bloques
    this.block[2].component = {
      [0]: this.op_tdo_tdo,
      [1]: this.op_tcd_tcd,
      [2]: this.per_act,
      [3]: this.des_cla,
      [4]: this.has_cla,
      [5]: this.des_ven,
      [6]: this.has_ven,
      [7]: this.tip_sel,
      [8]: this.tip_imp,
      [9]: this.imp_uni

    }
    this.block[2].prop.Visible = true
    this.block[2].prop.Disabled = false
    this.block[2].title = 'Generales'

    this.block[3].component = {
      [0]: this.sep_fam,
      [1]: this.num_fam,
      [2]: this.op_des_fam,
      [3]: this.op_has_fam
    }
    this.block[3].prop.Visible = true
    this.block[3].prop.Disabled = false
    this.block[3].title = 'Familias'

    this.block[0].prop.Visible = false
    this.block[0].prop.Disabled = true

    this.block[4].prop.Visible = false
    this.block[4].prop.Disabled = true

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    this.prop.cam_pri = 'cod_nom' // campo de buqueda principal
    var nom_par = 'Cliente'
    this.prop.Caption = "Comparativo de ventas mensuales ";

    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "co") {
      nom_par = 'Proveedor'
      this.prop.Caption = "Comparativo de compras mensuales ";

      this.fields = [
        ["cod_nom", nom_par, "'000000'", "'999999'"],
        ["nom_nom", "Nombre ", "''", "'ZZZZZZZZZZZZZ'"]
      ]

    }
    this.var_ord.prop.Value = "cod_nom";
    this.op_tcd_tcd.prop.Value = " "
    this.tip_sel.Option1.prop.Caption = "Producto";
    this.tip_sel.Option2.prop.Caption = "Vendedor";
    this.tip_sel.Option3.prop.Caption = nom_par.trim();
    this.tip_sel.Option4.prop.Caption = nom_par.trim() + "/vendedor";
    this.tip_sel.Option5.prop.Caption = nom_par.trim() + "/estado";
    this.tip_sel.Option6.prop.Caption = nom_par.trim() + "/consignatario";

  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    const tip_sel = this.tip_sel.prop.Value
    const imp_uni = this.imp_uni.prop.Value
    const tip_imp = this.tip_imp.prop.Value
    const op_tdo_tdo = this.op_tdo_tdo.prop.Value
    const op_tcd_tcd = this.op_tcd_tcd.prop.Value
    const des_cla = this.des_cla.prop.Value
    const has_cla = this.has_cla.prop.Value
    const des_ven = this.des_ven.prop.Value
    const has_ven = this.has_ven.prop.Value
    const per_act = this.per_act.prop.Value
    const sep_fam = this.sep_fam.prop.Value
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    let localWhere = " ";
    var tip_cop = 'C', tit_rep = '', alm_sql = ''
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "co") {
      tip_cop = 'P'
    }

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


    // armamos documentos si hay clasificacion
    var doc_imp = '', tit_rep = ''
    if (op_tdo_tdo.trim() != "??") {
      doc_imp = op_tdo_tdo.replaceAll(",", "','")
      // obtenemos la descripcion de los documentos seleccionados   
      var i = 0, j = doc_imp.length, tdo_tdo = ' ', des_tdo = ','
      for (let i = 0; i < j; i += 6) {
        tdo_tdo = doc_imp.slice(i, i + 3)
        const data = await this.Sql.localAlaSql(` select des_tdo from now.loc_cometdo where tdo_tdo='${tdo_tdo}'  `)
        des_tdo = des_tdo + "," + data[0].des_tdo.trim()
      }
      doc_imp = ' and ( tdo_tdo in (' + "'" + doc_imp + "'" + ') '
      tit_rep = tit_rep + 'Documentos: ' + des_tdo.replaceAll(",,", "")

    }
    if (op_tcd_tcd.trim() != "??") {
      doc_imp = doc_imp + ' and tcd_tcd in (' + "'" + op_tcd_tcd.replaceAll(",", "','") + "'" + ') '
      const data = await this.Sql.localAlaSql(` select des_tcd from now.loc_cometcd where tdo_tdo='${this.op_tdo_tdo.prop.Value}' and tcd_tcd='${this.op_tcd_tcd.prop.Value}'  `)
      tit_rep = tit_rep + ' ' + data[0].des_tcd.trim()
    }

    if (doc_imp.length > 2)
      doc_imp = doc_imp + ')'

    // verificamos si el programa es de inventarios tomamos fecha del movimiento

    let des_fec = await dateToSql(this.Form.mPublic.fpo_pge); //dateToSql(this.Form.des_fec.Value)
    this.des_fec.prop.Value = per_act + '01-01'
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    // armamos el orden del reporte
    var var_ord = this.var_ord.prop.Value;
    if (tip_imp == 1)
      order = 'cla_isu,ano,mes_est'
    else
      order = 'ano,mes_est,cla_isu'
    // pasamos a numerico la variable de orden

    if (this.var_ord.prop.Value == 'cod_nom')
      this.Form.ord_rep = 1
    else
      this.Form.ord_rep = 2

    // pasamos condiciones almacenadas en where a con_rep
    this.Form.con_rep = where
    var fam_esp = 'N'
    // si hay condiciones de reporte  
    if (where.length > 0)
      where = ' AND ' + where
    if (localWhere.length > 1)
      localWhere = localWhere + ' and '
    localWhere = localWhere +
      `  year(fec_doc)=${per_act} and cop_nom='${tip_cop}' 
      and  (cla_isu>='${des_cla}' AND cla_isu<='${has_cla}') 
      and  (ven_ven>=${des_ven} AND ven_ven<=${has_ven})  
      ${doc_imp} ${where} `
    var con_vis = localWhere

    var ins_sql = ` if OBJECT_ID('tempdb..#presult') is not null  drop table #presult 
   			if OBJECT_ID('tempdb..#totconsg') is not null  drop table #totconsg 
     SELECT cop_nom,ven_ven,nom_ven,cod_nom,nom_nom,un1_isu,can_mov,pve_mov,car_abo,Year(fec_doc) as ano,
       Month(fec_doc) as mes_est,edo_edo,fam_esp,con_con,ISNULL(nom_con,nom_nom) nom_con,`
    if (sep_fam == 0)
      ins_sql = ins_sql + `cla_isu,des_isu,`
    else
      ins_sql = ins_sql + `cla_fam as cla_isu,des_fam as des_isu,`
    ins_sql = ins_sql + `(case when vol_pro<>0 then vol_pro else pes_pro end) as vol_pro  
    into #presult from ${this.vis_rep} `
    if (sep_fam == 1)
      ins_sql = ins_sql + `
     left outer join man_comefam on man_comefam.num_fam=${num_fam}
     and man_comefam.cla_fam=${var_fam}  `
    ins_sql = ins_sql + `
  where ${con_vis} `

    var que_imp = '', que_god = ''
    if (imp_uni == 2)
      que_imp = `
           sum(can_mov*car_abo) as pve_mov, `
    else
      que_imp = `sum(pve_mov*car_abo) as pve_mov, 
      `
    if (tip_imp == 1) {
      que_god = `cla_isu,MAX(des_isu) as des_isu,`
      order = 'cla_isu,ano,mes_est'

    }
    else {
      que_god = `max(' ') as cla_isu,MAX(vol_pro) vol_pro,MAX(' ') as des_isu,`
      order = 'ano,mes_est'
    }
    var que_sel = ''
    switch (tip_sel) {
      case 1: {
        que_sel = ` Select max(cop_nom) cop_nom,mes_est,ano,cla_isu as cod_rep,Max(des_isu)as des_rep,cla_isu,
        MAX(des_isu) as des_isu,MAX(vol_pro) vol_pro,MAX(0) as ven_ven,MAX(' ') as nom_ven,
        ' ' as cod_nom,' ' as nom_nom,${que_imp}`
        if (tip_imp == 1 && imp_uni == 2)
          que_sel = que_sel + `un1_isu From #presult group by cla_isu,`
        else
          que_sel = que_sel + `MAX(un1_isu) as un1_isu  From #presult group by cla_isu,`
        order = ''
        if (imp_uni == 2) {
          que_sel = que_sel + `un1_isu,`
          order = 'un1_isu,'
        }
        que_sel = que_sel + `ano,mes_est order by cla_isu,${order}ano,mes_est `

        break;
      }
      case 2: {
        que_sel = ` Select max(cop_nom) cop_nom,mes_est,ano,ven_ven as cod_rep,MAX(nom_ven) as des_rep,
        MAX(ven_ven) as ven_ven,MAX(nom_ven) as nom_ven,MAX(' ') as cod_nom,MAX(' ') as nom_nom,
        ${que_god} ${que_imp} MAX(un1_isu) as un1_isu From #presult
         group by ven_ven,${order} order by ven_ven,${order} `
        break;
      }
      case 3: {
        que_sel =
          ` Select max(cop_nom) cop_nom,mes_est,ano,cod_nom as cod_rep,Max(nom_nom)as des_rep,cod_nom,
          MAX(nom_nom) as nom_nom,MAX(0) as ven_ven,MAX(' ') as nom_ven,
          ${que_god} ${que_imp} MAX(un1_isu) as un1_isu From #presult
           group by cod_nom,${order} order by ${var_ord},${order} `
        break;
      }
      case 4: {
        que_sel = ` Select max(cop_nom) cop_nom,ven_ven,MAX(nom_ven) as nom_ven,cod_nom as cod_rep,
        MAX(nom_nom) as des_rep,mes_est,ano,${que_god}${que_imp} MAX(un1_isu) as un1_isu,max(nom_nom) nom_nom From #presult
        group by ven_ven,cod_nom,${order} order by ven_ven,${var_ord},${order}`
        break;
      }
      case 5: {
        que_sel = ` Select max(cop_nom) cop_nom,edo_edo as ven_ven,MAX(edo_edo) as nom_ven,
        cod_nom as cod_rep,MAX(nom_nom) as des_rep,mes_est,ano,${que_god}${que_imp} 
        MAX(un1_isu) as un1_isu,max(nom_nom) nom_nom From #presult 
        group by edo_edo,cod_nom,${order} order by edo_edo,${var_ord},${order} `
        break;
      }
      case 6: {
        que_sel = `  select cod_nom as cod_csg,MAX(con_con) tot_csg into #totconsg 
        from  #presult group by cod_nom 
       Select max(cop_nom) cop_nom,cod_nom as ven_ven,MAX(nom_nom) as nom_ven,CAST(con_con as char(6)) as cod_rep,
       MAX(nom_con) as des_rep,mes_est,ano,${que_god}MAX(tot_csg) as tot_csg, ${que_imp}
       MAX(un1_isu) as un1_isu,max(nom_nom) nom_nom From #presult
       left join #totconsg on cod_csg=cod_nom `
        if (var_ord == 'con_con')
          order = 'con_con,' + order
        else
          order = 'nom_con,con_con,' + order
        que_sel = que_sel + ` group by cod_nom,${order} order by cod_nom,${order} 
       drop table #totconsg `
        break;
      }

    }
    ins_sql = ins_sql + ` ${que_sel} `

    this.Form.tit_rep = tit_rep
    this.Form.con_rep = where
    console.log(
      "sqlQuery =",
      ` ${ins_sql}  `
    );
    return ` ${ins_sql} `;
  }
} // End ThisForm
