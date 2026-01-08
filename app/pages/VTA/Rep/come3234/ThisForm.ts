//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
// Description : Estadistica de insumos por documento
// Author : MGSR
// Creation : 2025-07-16
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";
import { tip_des } from "./tip_des";
import { tip_det } from "./tip_det";
import { tip_exp } from "./tip_exp";
import { des_cte } from "./des_cte";
import { has_cte } from "./has_cte";
import { ini_sem } from "./ini_sem";
import { fec_ini } from "./fec_ini";
import { fec_fin } from "./fec_fin";
import { addDay } from "~/composables/Functions";
export class ThisForm extends reportVtas {
  public tip_des = new tip_des()
  public tip_det = new tip_det()
  public tip_exp = new tip_exp()
  public des_cte = new des_cte()
  public has_cte = new has_cte()
  public ini_sem = new ini_sem()
  public fec_ini = new fec_ini()
  public fec_fin = new fec_fin()


  constructor() {
    super(2); // inicializa la clase base
    this.tab_ord = "vi_come5203";
    this.prop.Name = "come3234";
    this.prop.Caption = "Estadística de insumos por documento";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5203"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come3234"; // no incluir extencion jasper o jrxml
    // deshabilitamos y habilitamos elementos requeridos de la clase
    this.tip_rep.prop.Visible = false; // Muestra general o detallado
    this.tip_rep.prop.Disabled = true;
    this.fec_ini.prop.Visible = true;
    this.fec_ini.prop.Disabled = false;
    this.fec_fin.prop.Visible = true;
    this.fec_fin.prop.Disabled = false;
    this.des_fec.prop.Visible = false;
    this.des_fec.prop.Disabled = true;
    this.has_fec.prop.Visible = false;
    this.has_fec.prop.Disabled = true;
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.ini_sem.prop.Visible = false;
    this.ini_sem.prop.Disabled = true;
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.alm_rep.prop.Visible = true
    this.alm_rep.prop.Disabled = false
    this.tip_imp.prop.Visible = false;
    this.tip_imp.prop.Disabled = true;
    this.sep_fam.prop.Visible = true;
    this.sep_fam.prop.Disabled = false;
    this.op_tdo_tdo.prop.MultiSelect = true;
    this.des_cte.prop.Visible = false;
    this.des_cte.prop.Disabled = true
    this.has_cte.prop.Visible = false;
    this.has_cte.prop.Disabled = true;
    this.fec_ini.prop.Visible = true;
    this.op_tdo_tdo.prop.TabIndex = 1
    this.op_tcd_tcd.prop.TabIndex = 2
    this.tip_exp.prop.TabIndex = 3
    this.tip_des.prop.TabIndex = 4
    this.ini_sem.prop.TabIndex = 5
    this.fec_ini.prop.TabIndex = 6
    this.fec_fin.prop.TabIndex = 7
    this.tip_det.prop.TabIndex = 8
    this.des_cte.prop.TabIndex = 9
    this.has_cte.prop.TabIndex = 10
    this.alm_rep.prop.TabIndex = 11
    this.sep_fam.prop.TabIndex = 14
    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    this.prop.cam_pri = 'cla_isu' // campo de buqueda principal
    var tip_cop = 'C'
    this.tip_det.Option2.prop.Caption = "Cliente";
    this.tip_det.Option3.prop.Caption = "Cliente/consignatario";
    this.des_cte.prop.Caption = "Desde el cliente "
    this.has_cte.prop.Caption = "Hasta el cliente "

    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "co") {
      tip_cop = 'P'
      this.tip_det.Option2.prop.Caption = "Proveedor";
      this.tip_det.Option3.prop.Caption = "Proveedor/consignatario";
      this.des_cte.prop.Caption = "Desde el proveedor "
      this.has_cte.prop.Caption = "Hasta el proveedor "
    }


    this.des_dat.prop.InputMask = Public.value.ima_pge.trim()
    this.has_dat.prop.InputMask = Public.value.ima_pge.trim()

    this.fields = [
      ["cla_isu", "Clave", "''", "'ZZZZZZZZZZ'"],
      ["des_isu", "Descripción", "''", "'ZZZZZZZZZZ'"],
      ["sku_isu", "SKU", "''", "'ZZZZZZZZZZ'"]
    ]

    this.var_ord.prop.Value = "cla_isu";
    this.op_tcd_tcd.prop.Value = " "
    this.op_tdo_tdo.prop.Value = ""
    this.tip_det.prop.Value = 0;

    //   definicion de bloques
    this.block[2].component = {
      [0]: this.op_tdo_tdo,
      [1]: this.op_tcd_tcd,
      [2]: this.tip_exp,
      [3]: this.tip_des,
      [4]: this.ini_sem,
      [5]: this.fec_ini,
      [6]: this.fec_fin,
      [7]: this.tip_det,
      [8]: this.des_cte,
      [9]: this.has_cte,
      [10]: this.alm_rep,
      [11]: this.sep_fam
    }

    this.block[2].prop.Visible = true
    this.block[2].prop.Disabled = false
    this.block[2].title = 'Generales'

    this.block[0].prop.Visible = false
    this.block[0].prop.Disabled = true


    this.block[3].prop.Visible = false
    this.block[3].prop.Disabled = true
    //    console.log('PublicVar.fps_pge=', PublicVar.fps_pge, 'ini_sem=', getDay(PublicVar.fps_pge))

  }
  public async init() {
    await super.init();
    this.fec_fin.prop.Value = addDay(this.fec_ini.prop.Value, 13)
  }
  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    const tip_exp = this.tip_exp.prop.Value
    const tip_des = this.tip_des.prop.Value
    var tip_det = this.tip_det.prop.Value - 1
    const op_tdo_tdo = this.op_tdo_tdo.prop.Value
    const op_tcd_tcd = this.op_tcd_tcd.prop.Value
    const des_cte = this.des_cte.prop.Value
    const has_cte = this.has_cte.prop.Value
    const ini_sem = this.ini_sem.prop.Value
    const alm_rep = this.alm_rep.prop.Value
    const sep_fam = this.sep_fam.prop.Value
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    if (op_tdo_tdo == '') {
      await MessageBox('No hay documento(s) seleccionado(s)', 1, 'Error')
      return false
    }
    let localWhere = " ";
    var tip_cop = 've', tit_rep = '', alm_sql = '', fec_que = 'fec_doc'
    if (this.Form.Params[0] && typeof this.Form.Params[0] == 'string')
      tip_cop = this.Form.Params[0].replaceAll("´", "").toLowerCase()
    if (tip_cop == "co")
      tip_cop = 'P'
    if (tip_cop == "ve")
      tip_cop = 'C'
    if (tip_cop == "in")
      fec_que = "fec_mov"

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
      tit_rep = tit_rep + ' ' + des_tdo.replaceAll(",,", "")

    }
    if (op_tcd_tcd.trim() != "??") {
      doc_imp = doc_imp + ' and tcd_tcd in (' + "'" + op_tcd_tcd.replaceAll(",", "','") + "'" + ') '
      const data = await this.Sql.localAlaSql(` select des_tcd from now.loc_cometcd where tdo_tdo='${this.op_tdo_tdo.prop.Value}' and tcd_tcd='${this.op_tcd_tcd.prop.Value}'  `)
      tit_rep = tit_rep + ' ' + data[0].des_tcd.trim()
    }
    if (doc_imp.length > 2)
      doc_imp = doc_imp + ')'
    // armamos almacen
    var alm_sql = ''
    if (alm_rep.trim() != '??') {
      alm_sql = ` and alm_tda='${alm_rep}' `
      // generamos titulo del reporte
      const data = await this.Sql.localAlaSql(` select des_tda from now.loc_cometda where alm_tda='${alm_rep}' `)
      tit_rep = tit_rep + ' almacén ' + data[0].des_tda.trim()
    }
    else
      tit_rep = tit_rep + ' todos los almacenes '

    // verificamos si el programa es de inventarios tomamos fecha del movimiento

    const fec_ini = await dateToSql(this.Form.fec_ini.prop.Value); //dateToSql(this.Form.fec_ini.Value)
    const fec_fin = await dateToSql(this.Form.fec_fin.prop.Value); //dateToSql(this.Form.fec_fin.Value)
    // armamos el orden del reporte
    var var_ord = this.var_ord.prop.Value;
    // pasamos a numerico la variable de orden

    if (this.var_ord.prop.Value == 'cla_isu')
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
    if (tip_cop == 'in')
      localWhere = localWhere +
        `(fec_mov>='${fec_ini}' and fec_mov<='${fec_fin}') `
    else
      localWhere = localWhere +
        `(fec_doc>='${fec_ini}' and fec_doc<='${fec_fin}') `
    localWhere = localWhere + ` and can_mov<>0  ${doc_imp} ${alm_sql} `
    if (tip_des == 1)
      tit_rep = tit_rep + ' expresado en cantidades '
    else
      tit_rep = tit_rep + ' expresado en importes '
    if (tip_det > 0 && des_cte.trim() != '??')
      localWhere = localWhere + ` and (cod_nom>='${des_cte}' and cod_nom<='${has_cte}') `
    var tip_agr = ''
    switch (tip_des) {	// arma forma de agrupamiento
      case 1: {
        tip_agr = ' cast((MONTH(' + fec_que + ')*100)+day(' + fec_que + ') as int)'
        tit_rep = tit_rep + ' y desglosado por días'
        break
      }
      case 2: {
        tip_agr = "case when DATEPART(WEEK," + fec_que + ")<53 then DATEPART(WEEK," + fec_que + ") else 1 end"
        tit_rep = tit_rep + ' y desglosado por semanas'
        break
      }
      case 3: {
        tip_agr = "cast((year(" + fec_que + ")*100)+MONTH(" + fec_que + ") as numeric(6))"
        tit_rep = tit_rep + ' y desglosado por meses'
        break
      }
      case 4: {
        tip_agr = 'year(' + fec_que + ')'
        tit_rep = tit_rep + ' y desglosado por años'
        break
      }
    }

    var ord_vis = " cod_nom,con_con,cla_isu,ord_dat"
    if (sep_fam == 1)
      ord_vis = `${var_fam},ord_dat`

    var con_vis = localWhere
    order = ''
    if (tip_det == 1)
      order = "cod_nom,"
    if (tip_det == 2)
      order = "cod_nom,con_con,"
    console.log('tip_exp=', tip_exp, 'tip_des=', tip_des, 'tip_det=', tip_det, 'tip_agr=', tip_agr)
    var ins_sql = ` if OBJECT_ID('tempdb..#result01') is not null  drop table #result01 
declare @t_col int,
@enc_per varchar(max),
@col_per varchar(max),
@enc_d varchar(max)
exec P_come3234 '${fec_ini}','${fec_fin}',${tip_des},${ini_sem},@t_col output,@enc_per output,@col_per output,@enc_d output
    SELECT Max(INV_TDO) as inv_tdo,MAX(${fec_que}) as fec_mov,
     CLA_ISU AS cla_isu,MAX(des_isu) as des_isu,MAX(cla_tca) as cla_tca,MAX(dea_tca) as dea_tca,SUM(CAN_MOV) AS can_mov, 
    MAX(fic_alm) as fic_alm,MAX(fiv_alm) as fiv_alm,`
    if (tip_det == 0)
      ins_sql = ins_sql + `max(' ') cod_nom,`
    else
      ins_sql = ins_sql + `cod_nom,`
    if (tip_det == 2)
      ins_sql = ins_sql + `con_con,`
    else
      ins_sql = ins_sql + `max(0) con_con,`
    ins_sql = ins_sql + `max(nom_nom) nom_nom,MAX(noc_con) noc_con,
	  SUM(PVE_MOV) AS pve_mov,${tip_agr} as ord_dat into #result01 
    from ${this.vis_rep} where ${con_vis}
    group by ${order}cla_isu,${tip_agr} with rollup 
    order by ${order}cla_isu,${tip_agr}
    `
    ins_sql = ins_sql + `
    select cod_nom,con_con,inv_tdo,fec_mov,cla_isu,des_isu,cla_tca,dea_tca,`
    if (tip_exp == 1)
      ins_sql = ins_sql + `can_mov`
    else
      ins_sql = ins_sql + `pve_mov`
    ins_sql = ins_sql + ` as can_mov, 
    fic_alm,fiv_alm,nom_nom,noc_con,rtrim(cast(ISNULL(ord_dat,(@t_col+1)) as char(10))) as ord_dat ,
    @enc_per enc_per,@col_per col_per,@enc_d enc_d,@t_col t_col
    FROM #RESULT01  
     where cla_isu is not null order by ${ord_vis}
      drop table #RESULT01 
 `
    // asignamos ultimos valores al titulo del reporte
    this.Form.tit_rep = tit_rep
    this.Form.con_rep = where

    var dia = getDay(this.Form.fec_ini.prop.Value)
    console.log('dia_semana=', dia)
    console.log(
      "sqlQuery =",
      ` ${ins_sql}  `
    );
    return ` ${ins_sql} `;
  }
} // End ThisForm
