//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
// Description : Ventas por familia
// Author : MGSR
// Creation : 2025-08-08
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";
import { tip_sta } from "./tip_sta";
import { ven_ven } from "./ven_ven";
import { tip_opc } from "./tip_opc";
import { usu_doc } from "./usu_doc";
export class ThisForm extends reportVtas {
  public tip_sta = new tip_sta()
  public ven_ven = new ven_ven()
  public tip_opc = new tip_opc()
  public usu_doc = new usu_doc()
  constructor() {
    super(2); // inicializa la clase base
    this.tab_ord = "vi_come5223";
    this.prop.Name = "come5223";
    this.prop.Caption = "Kardex de documentos";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5223"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come5223"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false; // Muestra general o detallado
    this.tip_rep.prop.Disabled = true;
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.alm_rep.prop.Visible = false
    this.alm_rep.prop.Disabled = true
    this.tip_imp.prop.Visible = false;
    this.tip_imp.prop.Disabled = true;
    this.op_tdo_tdo.prop.MultiSelect = true;
    this.op_tdo_tdo.prop.TabIndex = 1
    this.op_tcd_tcd.prop.TabIndex = 2
    this.usu_doc.prop.TabIndex = 3
    this.des_fec.prop.TabIndex = 4
    this.has_fec.prop.TabIndex = 5
    this.ven_ven.prop.TabIndex = 6
    this.tip_opc.prop.TabIndex = 7
    this.tip_sta.prop.TabIndex = 8
    // definicion de bloques
    this.block[2].component = {
      [0]: this.op_tdo_tdo,
      [1]: this.op_tcd_tcd,
      [2]: this.usu_doc,
      [3]: this.des_fec,
      [4]: this.has_fec,
      [5]: this.ven_ven,
      [6]: this.tip_opc,
      [7]: this.tip_sta

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
    this.prop.cam_pri = 'ndo_tdo' // campo de buqueda principal

  }

  public override async init() {
    await super.init();
    // Campos de orden de la vista
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
    const tip_opc = this.tip_opc.prop.Value
    const tip_sta = this.tip_sta.prop.Value
    const ven_ven = this.ven_ven.prop.Value
    const usu_doc = this.usu_doc.prop.Value
    const op_tdo_tdo = this.op_tdo_tdo.prop.Value
    const op_tcd_tcd = this.op_tcd_tcd.prop.Value
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)

    // armamos documentos si hay clasificacion
    var doc_imp = '', tit_rep = '', dpe_usu = '', sql_tor = ''
    if (op_tdo_tdo.trim() != "??") {
      doc_imp = op_tdo_tdo.replaceAll(",", "','")
      dpe_usu = "<" + op_tdo_tdo.replaceAll(",", "><") + ">"
      // obtenemos la descripcion de los documentos seleccionados   
      var i = 0, j = doc_imp.length, tdo_tdo = ' ', des_tdo = ','
      for (let i = 0; i < j; i += 6) {
        tdo_tdo = doc_imp.slice(i, i + 3)
        const data = await this.Sql.localAlaSql(` select des_tdo from now.loc_cometdo where tdo_tdo='${tdo_tdo}'  `)
        des_tdo = des_tdo + "," + data[0].des_tdo.trim()
      }
      sql_tor = ' tor_doc in (' + "'" + doc_imp + "'" + ')'
      doc_imp = ' tdo_tdo in (' + "'" + doc_imp + "'" + ') '
      tit_rep = tit_rep + 'Documentos: ' + des_tdo.replaceAll(",,", "")

    }
    if (op_tcd_tcd.trim() != "??") {
      doc_imp = '( ' + doc_imp + ' and tcd_tcd in (' + "'" + op_tcd_tcd.replaceAll(",", "','") + "'" + ') ) '
      const data = await this.Sql.localAlaSql(` select des_tcd from now.loc_cometcd where tdo_tdo='${this.op_tdo_tdo.prop.Value}' and tcd_tcd='${this.op_tcd_tcd.prop.Value}'  `)
      tit_rep = tit_rep + ' ' + data[0].des_tcd.trim()
    }

    if (doc_imp.length > 2)
      console.log('dpe_usu=', dpe_usu, 'doc_imp=', doc_imp, 'sql_tor=', sql_tor)
    if (tip_sta == 1)
      tit_rep = tit_rep + " Origen de documentos Generados o Convertidos"
    else {
      tit_rep = tit_rep + " Documentos "
      if (tip_sta == 2)
        tit_rep = tit_rep + " no "
      tit_rep = tit_rep + "procesados "
    }
    tit_rep = tit_rep + " del " + des_fec + " al " + has_fec
    if (usu_doc != "??")
      tit_rep = tit_rep + " Usuario: " + usu_doc

    this.Form.con_rep = where
    // si hay condiciones de reporte  
    if (where.length > 0)
      where = ' AND ' + where
    // usuarios
    var con_vis = ` ${doc_imp}  `
    if (tip_sta == 1)
      con_vis = " (" + con_vis + ` or ${sql_tor} ) `
    if (usu_doc.trim() != "??" || tip_opc == 1)
      con_vis = con_vis + ` and cve_usu=${usu_doc} `
    if (usu_doc.trim() != "??")
      con_vis = con_vis + ` and charindex(tor_doc,'${dpe_usu}')>0  `
    if (ven_ven > 0)
      con_vis = con_vis + ` and ven_ven=${ven_ven} `

    con_vis = ' where ' + con_vis +
      ` and (fec_doc>='${des_fec}' AND fec_doc<='${has_fec}')  ${where}  `

    var ins_sql = ` if OBJECT_ID('tempdb..#temp01') is not null  drop table #temp01 `
    if (tip_sta == 1)

      ins_sql = ins_sql + ` select (case when tor_doc=' ' then tdo_tdo else tor_doc end) as tor_tem,
           (case when tor_doc=' ' then ndo_doc else nor_doc end) as nor_tem,${tip_sta} as tip_est, ${this.Form.vis_rep}.* 
            from ${this.Form.vis_rep} ${con_vis}
		    order by tor_tem,nor_tem,key_doc `
    else {
      ins_sql = ins_sql + `
SELECT tor_doc tor_tem,nor_doc nor_tem,${tip_sta} as tip_est,
         * from ${this.Form.vis_rep} ${con_vis}
         and  ( ISNULL(tde_doc,' ') `

      if (tip_sta == 2)
        ins_sql = ins_sql + `=' ' ) `
      else
        ins_sql = ins_sql + `<>' ') `

      ins_sql = ins_sql + ` order by tdo_tdo,ndo_doc,fec_doc,key_doc `


    }
    this.Form.tit_rep = tit_rep
    console.log(
      "sqlQuery =",
      ` ${ins_sql}  `
    );
    return ` ${ins_sql}   `;
  }
} // End ThisForm
