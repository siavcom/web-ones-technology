//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
// Description : Insumos por surtir
// Author : MGSR
// Creation : 2025-06-25
// Update Date  : 2025-06-25
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";
import { imp_exi } from "./imp_exi";

export class ThisForm extends reportVtas {
  public imp_exi = new imp_exi()
  constructor() {
    super(3); // inicializa la clase base
    this.tab_ord = "vi_come5207";
    this.prop.Name = "come5208";
    this.prop.Caption = "Insumos por surtir";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5207"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come5208"; // no incluir extencion jasper o jrxml
    this.mon_rep.prop.Visible = false; // 
    // deshabilitamos elementos que no requerimos
    this.mon_rep.prop.Disabled = true;
    this.tip_rep.prop.Visible = false; // 
    this.tip_rep.prop.Disabled = true;
    // Habilitamos elementos que si se requieren
    this.op_tdo_tdo.prop.Visible = true;
    this.op_tdo_tdo.prop.Disabled = false;
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.des_fec.prop.Visible = true;
    this.des_fec.prop.Disabled = false;
    this.sep_fam.prop.Visible = true
    this.sep_fam.prop.Disabled = false
    this.alm_rep.prop.Visible = true
    this.alm_rep.prop.Disabled = false
    this.alm_rep.prop.MultiSelect = true;
    // damos orden de visualizacion
    this.op_tdo_tdo.prop.TabIndex = 1;
    this.op_tcd_tcd.prop.TabIndex = 2;
    this.des_fec.prop.TabIndex = 4;
    this.has_fec.prop.TabIndex = 5
    this.imp_exi.prop.TabIndex = 6
    this.alm_rep.prop.TabIndex = 3
    this.sep_fam.prop.TabIndex = 7
    // definicion de bloques
    this.block[2].component = {
      [0]: this.op_tdo_tdo,
      [1]: this.op_tcd_tcd,
      [2]: this.alm_rep,
      [3]: this.des_fec,
      [4]: this.has_fec,
      [5]: this.imp_exi

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


    // Definimos campos de orden/busqueda
    this.prop.cam_pri = 'cla_isu' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["cla_isu", "Clave"],
      ["des_isu", "Descripción"],
      ["sku_isu", "SKU"]

    ]
    this.var_ord.prop.Value = "cla_isu";

    //    console.log('parametros=',this.Form.Params[0])

  }

  public async init() {

    await super.init();


    console.log(
      "===================>Init Report name=",
      this.prop.Name,
      "var_ord",
      this.var_ord.prop.Value
    );
    // this.openFilters()


  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const op_tdo_tdo = this.op_tdo_tdo.prop.Value;
    const op_tcd_tcd = this.op_tcd_tcd.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    var alm_rep = this.alm_rep.prop.Value;
    const imp_exi = this.imp_exi.prop.Value;
    let localWhere = " ";
    var par_prg = 'C', tit_rep = '', alm_sql = ''
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
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
    // armamos documento a imprimir
    var doc_imp = '', tit_rep = '', i = 0, j = 0, tdo_tdo = ' ', des_tdo = ',', alm_tda = ' '
    if (op_tdo_tdo.trim() != "??") {
      doc_imp = op_tdo_tdo.replaceAll(",", "','")
      // obtenemos la descripcion de los documentos seleccionados   
      i = 0, j = doc_imp.length, tdo_tdo = ' ', des_tdo = ','
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

    // armamos almacen
    if (alm_rep.trim() != '??') {
      alm_sql = alm_rep.replaceAll(",", "','")
      alm_rep = "'" + alm_rep + "'"
      // generamos titulo del reporte
      // obtenemos la descripcion de los documentos seleccionados  
      var des_tda = ','
      i = 0, j = alm_sql.length, alm_tda = ' '
      for (let i = 0; i < j; i += 6) {
        alm_tda = alm_sql.slice(i, i + 3)
        const data = await this.Sql.localAlaSql(` select des_tda from now.loc_cometda where alm_tda='${alm_tda}'  `)
        des_tda = des_tda + "," + data[0].des_tda.trim()
      }
      alm_sql = ' and ( alm_tda in (' + "'" + alm_sql + "'" + ')) '
      tit_rep = tit_rep + ' almacen(s) ' + des_tda.replaceAll(",,", "")

    }
    else {
      tit_rep = tit_rep + ' todos los almacenes '
      alm_rep = 'NULL';

    }
    this.Form.tit_rep = tit_rep
    this.Form.con_rep = where

    if (where.length > 0)
      where = ` and ${where}  `

    // armamos el orden del reporte
    var var_ord = this.var_ord.prop.Value;

    // amamos condiciones 
    var tip_ord = '', ins_sql = ''
    if (localWhere.length > 3)
      localWhere = localWhere + ' and '

    localWhere =
      localWhere +
      ` (fec_doc>='${des_fec}' and fec_doc<='${has_fec}')  ${alm_sql} ${doc_imp} ${where} `

    ins_sql = `if OBJECT_ID('tempdb..#temp') is not null  drop table #temp 
      if OBJECT_ID('tempdb..#existe') is not null  drop table #existe 
      select distinct cla_isu as cla_pro into #temp from ${this.Form.vis_rep}  where ${localWhere} 
	    select cla_pro,isnull(dbo.f_cal_exi_gen(cla_pro,0,'${has_fec}',${alm_rep},NULL,NULL,NULL),0) as exi_pro into #existe from #temp 
	    select *,${que_fam} des_fam from   #existe join ${this.Form.vis_rep} on cla_isu=cla_pro  where ${localWhere}  
      `
    if (imp_exi == 1)
      ins_sql = ins_sql + ` and exi_pro>0 `
    ins_sql = ins_sql + ` ${order},tdo_tdo,ndo_doc drop table #temp  drop table #existe `

    console.log(
      "sqlQuery =",
      ` ${ins_sql} `
    );
    return ` ${ins_sql} `;
  }
} // End ThisForm
