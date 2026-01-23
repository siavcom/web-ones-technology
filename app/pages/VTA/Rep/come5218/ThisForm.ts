//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : thisForm
// Description : Ventas por familia
// @author: MGSR
// Creation : 2025-07-07
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";
import { tip_sel } from "./tip_sel";
import { imp_uni } from "./imp_uni";
export class ThisForm extends reportVtas {
  public tip_sel = new tip_sel()
  public imp_uni = new imp_uni()
  constructor() {
    super(2); // inicializa la clase base
    this.tab_ord = "vi_come5217";
    this.prop.Name = "come5218";
    this.prop.Caption = "Ventas por familia";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5217"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come5218v"; // no incluir extencion jasper o jrxml
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
    this.imp_uni.prop.Visible = false;
    this.imp_uni.prop.Disabled = true;
    this.op_tdo_tdo.prop.MultiSelect = true;
    this.op_tdo_tdo.prop.TabIndex = 1
    this.op_tcd_tcd.prop.TabIndex = 2
    this.des_fec.prop.TabIndex = 3
    this.has_fec.prop.TabIndex = 4
    this.tip_sel.prop.TabIndex = 5
    this.tip_imp.prop.TabIndex = 6
    this.imp_uni.prop.TabIndex = 7
    // definicion de bloques
    this.block[2].component = {
      [0]: this.op_tdo_tdo,
      [1]: this.op_tcd_tcd,
      [2]: this.des_fec,
      [3]: this.has_fec,
      [4]: this.tip_sel,
      [5]: this.tip_imp,
      [6]: this.imp_uni

    }
    this.block[2].prop.Visible = true
    this.block[2].prop.Disabled = false
    this.block[2].title = 'Generales'

    this.block[0].prop.Visible = false
    this.block[0].prop.Disabled = true

    this.block[3].prop.Visible = false
    this.block[3].prop.Disabled = true

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    this.prop.cam_pri = 'cod_nom' // campo de buqueda principal
    this.fields = [
      ["cod_nom", "Cliente", "'000000'", "'999999'"],
      ["nom_nom", "Nombre ", "''", "'ZZZZZZZZZZZZZ'"]
    ]

  }

  public override async init() {
    await super.init();
    // Campos de orden de la vista
    var nom_par = 'clientes'
    this.prop.Caption = "Ventas por familia ";

    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "co") {
      nom_par = 'proveedores'
      this.prop.Caption = "Compras por familia ";

    }
    this.var_ord.prop.Value = "cod_nom";
    this.op_tcd_tcd.prop.Value = " "
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
    const imp_uni = this.imp_uni.prop.Value
    const tip_imp = this.tip_imp.prop.Value
    const op_tdo_tdo = this.op_tdo_tdo.prop.Value
    const op_tcd_tcd = this.op_tcd_tcd.prop.Value
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
    // pasamos a numerico la variable de orden
    order = 'cod_nom'
    if (var_ord == 'nom_nom')
      order = 'nom_nom,cod_nom'
    if (tip_imp == 1)
      order = order + ',fam_esp,cla_isu'
    else
      order = order + ',fam_esp'
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
      `  (fec_doc>='${des_fec}' AND fec_doc<='${has_fec}')  ${doc_imp} ${where} `
    var con_vis = localWhere
    const data = await this.Sql.localAlaSql(` select top 1 pri_cla,ult_cla,que_fam from now.loc_comefam where num_fam=1 `)
    var var_fam = `substring(cla_isu,1,${data[0].ult_cla - 1})`

    var ins_sql = ` if OBJECT_ID('tempdb..#esultado') is not null  drop table #esultado 
        SELECT cop_nom,cast(ven_ven as char(25)) ven_ven,nom_ven,cod_nom,nom_nom,cla_isu,des_isu,can_mov,pve_mov,car_abo,un1_isu,
         edo_edo,`
    if (fam_esp == "S")
      ins_sql = ins_sql + `RTRIM(fam_esp) `
    else
      ins_sql = ins_sql + `${var_fam} as fam_esp,ISNULL(`

    if (fam_esp == 'S')
      ins_sql = `dbo.F_obt_dat_xml('COMEPGE',1,'DESFAM'+RTRIM(fam_esp))`
    else
      ins_sql = ins_sql + `des_fam,' ')`
    ins_sql = ins_sql + ` as desfam  
         into #esultado from ${this.vis_rep} `
    if (fam_esp = 'N')
      ins_sql = ins_sql + ` left outer join man_comefam on num_fam=1 and cla_fam=${var_fam}
       where ${con_vis}
    `
    var que_sel = ''
    switch (tip_sel) {
      case 1: {
        que_sel = ` 
       Select fam_esp,cod_nom as cod_rep,Max(nom_nom)as des_rep,MAX(' ') as ven_ven,MAX(' ') as nom_ven,MAX(un1_isu) as un1_isu,`
        break;
      }
      case 2: {
        que_sel = ` 
        Select fam_esp,ven_ven as cod_rep,MAX(nom_ven) as des_rep,MAX(ven_ven) as ven_ven,MAX(nom_ven) as nom_ven,MAX(un1_isu) as un1_isu,`
        if (tip_imp == 1)
          order = 'ven_ven,fam_esp,cla_isu'
        else
          order = 'ven_ven,fam_esp'
        break;
      }
      case 3: {
        que_sel =
          ` Select fam_esp,ven_ven,MAX(nom_ven) as nom_ven,cod_nom as cod_rep,MAX(nom_nom) as des_rep,MAX(un1_isu) as un1_isu,`
        order = 'ven_ven,' + order
        break;
      }
      case 4: {
        que_sel = ` 
       Select fam_esp,edo_edo as ven_ven,MAX(edo_edo) as nom_ven,cod_nom as cod_rep,MAX(nom_nom) as des_rep,MAX(un1_isu) as un1_isu,`
        order = 'edo_edo,' + order
        break;
      }
    }
    ins_sql = ins_sql + ` ${que_sel}sum(can_mov*car_abo) as can_det,sum(pve_mov*car_abo) as pve_det,sum(can_mov*car_abo) as can_mov,`
    if (tip_imp == 1)
      ins_sql = ins_sql + `cla_isu,MAX(des_isu) as des_isu,`
    else ins_sql = ins_sql + `max(' ') as cla_isu,MAX(' ') as des_isu,`
    if (imp_uni == 2)
      ins_sql = ins_sql + `sum(can_mov*car_abo) as pve_mov`
    else
      ins_sql = ins_sql + `sum(pve_mov*car_abo) as pve_mov`
    ins_sql = ins_sql + `,MAX(desfam) as desfam,max(cop_nom) cop_nom From #esultado 
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
