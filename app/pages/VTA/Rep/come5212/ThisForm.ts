//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
// Description : Estadistica general de ventas/compras
// Author : MGSR
// Creation : 2025-07-09
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";
import { tip_sel } from "./tip_sel";
import { sep_con } from "./sep_con";
import { des_cla } from "./des_cla";
import { has_cla } from "./has_cla";
import { des_ven } from "./des_ven";
import { has_ven } from "./has_ven";
export class ThisForm extends reportVtas {
  public tip_sel = new tip_sel()
  public sep_con = new sep_con()
  public des_cla = new des_cla()
  public has_cla = new has_cla()
  public des_ven = new des_ven()
  public has_ven = new has_ven()
  constructor() {
    super(2); // inicializa la clase base
    this.tab_ord = "vi_come5203";
    this.prop.Name = "come5212";
    this.prop.Caption = "Estadística General ";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5203"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come5212"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false; // Muestra general o detallado
    this.tip_rep.prop.Disabled = true;
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.alm_rep.prop.Visible = false
    this.alm_rep.prop.Disabled = true
    this.tip_imp.prop.Visible = true;
    this.tip_imp.prop.Disabled = false;
    this.sep_con.prop.Visible = true;
    this.sep_con.prop.Disabled = false;
    this.op_tdo_tdo.prop.MultiSelect = true;
    this.op_tdo_tdo.prop.TabIndex = 1
    this.op_tcd_tcd.prop.TabIndex = 2
    this.des_fec.prop.TabIndex = 3
    this.has_fec.prop.TabIndex = 4
    this.des_cla.prop.TabIndex = 5
    this.has_cla.prop.TabIndex = 6
    this.des_ven.prop.TabIndex = 7
    this.has_ven.prop.TabIndex = 8
    this.tip_sel.prop.TabIndex = 9
    this.tip_imp.prop.TabIndex = 11
    this.sep_con.prop.TabIndex = 10
    this.block[2].component = {
      [0]: this.op_tdo_tdo,
      [1]: this.op_tcd_tcd,
      [2]: this.des_fec,
      [3]: this.has_fec,
      [4]: this.des_cla,
      [5]: this.has_cla,
      [6]: this.des_ven,
      [7]: this.has_ven,
      [8]: this.tip_sel,
      [9]: this.tip_imp,
      [10]: this.sep_con
    }

    this.block[2].prop.Visible = true
    this.block[2].prop.Disabled = false
    this.block[2].title = 'Generales'

    this.block[0].prop.Visible = false
    this.block[0].prop.Disabled = true


    this.block[3].prop.Visible = false
    this.block[3].prop.Disabled = true

    this.prop.cam_pri = 'cod_nom' // campo de buqueda principal
    this.fields = [
      ["cod_nom", "Cliente", "'000000'", "'999999'"],
      ["nom_nom", "Nombre ", "''", "'ZZZZZZZZZZZZZ'"]
    ]

  }

  public override async init() {
    await super.init();
    // Campos de orden de la vista
    var nom_par = 'Cliente'
    this.prop.Caption = "Estadística general de ventas ";

    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "co") {
      nom_par = 'Proveedor'
      this.prop.Caption = "Estadística general de compras";
    }
    this.var_ord.prop.Value = "cod_nom";
    this.op_tcd_tcd.prop.Value = " "

    this.tip_sel.Option1.prop.Caption = "Documento";
    this.tip_sel.Option2.prop.Caption = "Vendedor";
    this.tip_sel.Option3.prop.Caption = nom_par;
    this.tip_sel.Option4.prop.Caption = "Vendedor/" + nom_par;

    console.log(
      "===================>Init Report name=",
      this.prop.Name,
      "var_ord",
      this.var_ord.prop.Value
    );
  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    const tip_sel = this.tip_sel.prop.Value
    const sep_con = this.sep_con.prop.Value
    const tip_imp = this.tip_imp.prop.Value
    const op_tdo_tdo = this.op_tdo_tdo.prop.Value
    const op_tcd_tcd = this.op_tcd_tcd.prop.Value
    const des_cla = this.des_cla.prop.Value
    const has_cla = this.has_cla.prop.Value
    const des_ven = this.des_ven.prop.Value
    const has_ven = this.has_ven.prop.Value

    let localWhere = "";
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

    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    // armamos el orden del reporte
    var var_ord = this.var_ord.prop.Value;
    order = 'cod_nom'
    if (var_ord == 'nom_nom')
      order = 'nom_nom,cod_nom'
    if (sep_con == 1)
      order = order + ',con_con'
    if (tip_imp == 1)
      order = order + ',cla_isu,ano,mes_est'
    else
      order = order + ',ano,mes_est,cla_isu'
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

    localWhere = localWhere +
      `  (fec_doc>='${des_fec}' AND fec_doc<='${has_fec}')
      and  (cla_isu>='${des_cla}' AND cla_isu<='${has_cla}') 
      and  (ven_ven>=${des_ven} AND ven_ven<=${has_ven})  
      ${doc_imp} ${where} `
    var con_vis = localWhere

    var ins_sql = ` if OBJECT_ID('tempdb..#esultado') is not null  drop table #esultado 
    SELECT cop_nom,ven_ven,nom_ven,cod_nom,nom_nom,con_con,noc_con,cla_isu,des_isu,cla_tca,dea_tca,
    can_mov,pve_mov,ent_sal,Year(fec_doc) as ano,Month(fec_doc) as mes_est  
    into #esultado  from ${this.vis_rep}   where ${con_vis} `

    var que_sel = ''
    switch (tip_sel) {
      case 1: {
        que_sel = ` 
  Select 0 as ven_ven,'      ' as nom_ven,'     ' as cod_nom,'      ' as nom_nom,
  max(' ') as con_con,MAX(' ') as noc_con,`
        if (tip_imp == 1)
          que_sel = que_sel + `mes_est,ano,`
        else
          que_sel = que_sel + `1 as mes_est,1900 as ano, `
        order = 'cla_isu,ano,mes_est'
        break;
      }
      case 2: {
        que_sel = ` 
        Select ven_ven,MAX(nom_ven) as nom_ven,MAX('    ') as cod_nom,MAX('     ') as nom_nom,
        mes_est,ano,max(' ') as con_con,MAX(' ') as noc_con,`
        if (tip_imp == 1)
          order = 'ven_ven,cla_isu,ano,mes_est'
        else
          order = 'ven_ven,ano,mes_est,cla_isu'
        break;
      }
      case 3: {
        que_sel =
          ` Select  MAX(0) as ven_ven,MAX('     ') as nom_ven,MAX(cod_nom) as cod_nom,
          MAX(nom_nom) as nom_nom,MAX(con_con) as con_con,MAX(noc_con) as noc_con,mes_est,ano,`
        break;
      }
      case 4: {
        que_sel = ` 
      Select ven_ven,MAX(nom_ven) as nom_ven,MAX(cod_nom) as cod_nom,MAX(nom_nom) as nom_nom,
      MAX(con_con) as con_con,MAX(noc_con) as noc_con,mes_est,ano,`
        order = 'ven_ven,' + order
        break;
      }
    }
    ins_sql = ins_sql + ` ${que_sel}cla_isu,Max(des_isu)as des_isu,max(cla_tca) as cla_tca,
    max(dea_tca) dea_tca,sum(can_mov*ent_sal) as can_mov ,sum(pve_mov*ent_sal) as pve_mov,
    max(cop_nom) cop_nom
    From #esultado 
           Group By ${order}
           Order By ${order} 
           drop table #esultado `

    this.Form.tit_rep = tit_rep
    console.log(
      "sqlQuery =",
      ` ${ins_sql}  `
    );
    return ` ${ins_sql}   `;
  }
} // End ThisForm
