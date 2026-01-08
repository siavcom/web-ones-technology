//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
// Description : Análisis de ventas/compras
// Author : MGSR
// Creation : 2025-07-10
// Update Date  : 2025-07-10
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportVtas } from "@/classes/Siavcom/reports/VTAS/reportVtas";

export class ThisForm extends reportVtas {

  constructor() {
    super(0); // inicializa la clase base
    this.tab_ord = "vi_come5201_g";
    this.prop.Name = "come5213";
    this.prop.Caption = "Análisis de ventas ";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come5201_g"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come5213"; // no incluir extencion jasper o jrxml
    this.mon_rep.prop.Visible = false; // 
    // deshabilitamos elementos que no requerimos
    this.mon_rep.prop.Disabled = true;
    this.tip_rep.prop.Visible = false; // 
    this.tip_rep.prop.Disabled = true;
    this.sep_fam.prop.Visible = false;
    this.sep_fam.prop.Disabled = true;
    this.alm_rep.prop.Visible = false
    this.alm_rep.prop.Disabled = true
    this.tip_imp.prop.Visible = false;
    this.tip_imp.prop.Disabled = true;
    // Habilitamos elementos que si se requieren
    this.op_tdo_tdo.prop.Visible = true;
    this.op_tdo_tdo.prop.Disabled = false;
    this.op_tdo_tdo.prop.MultiSelect = true;
    this.op_tcd_tcd.prop.Visible = false
    this.op_tcd_tcd.prop.Disabled = true
    this.des_fec.prop.Visible = true;
    this.des_fec.prop.Disabled = false;
    this.has_fec.prop.Visible = true;
    this.has_fec.prop.Disabled = false;

    // damos orden de visualizacion
    this.op_tdo_tdo.prop.TabIndex = 1;
    this.op_tcd_tcd.prop.TabIndex = 2;
    this.des_fec.prop.TabIndex = 3;
    this.has_fec.prop.TabIndex = 4
    // definimos bloques
    this.block[0].component = {
      [0]: this.op_tdo_tdo,
      [1]: this.op_tcd_tcd,
      [2]: this.des_fec,
      [3]: this.has_fec
    }

    this.block[1].prop.Visible = false
    this.block[1].prop.Disabled = true

    this.block[2].prop.Visible = false
    this.block[2].prop.Disabled = true

    this.block[3].prop.Visible = false
    this.block[3].prop.Disabled = true

    var nom_par = 'Cliente'
    this.prop.Caption = "Análisis de ventas ";

    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "co") {
      nom_par = 'Proveedor'
      this.prop.Caption = "Análisis de compras";
    }
    // Definimos campos de orden/busqueda
    this.prop.cam_pri = 'cod_nom' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["cod_nom", nom_par, "'000000'", "'999999'"],
      ["nom_nom", "Nombre ", "''", "'ZZZZZZZZZZZZZ'"]
    ]
    this.var_ord.prop.Value = "cod_nom";
    this.op_tcd_tcd.prop.Value = " "

  }

  public override async init() {
    await super.init();
    // Campos de orden de la vista

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
    const op_tdo_tdo = this.op_tdo_tdo.prop.Value;
    const op_tcd_tcd = this.op_tcd_tcd.prop.Value;
    let localWhere = " ";
    var tip_cop = 'C', tit_rep = '', tip_abo = 'A', tip_car = 'C'
    var nom_par = 'Cliente'
    this.prop.Caption = "Análisis de ventas ";
    if (this.Form.Params[0] && typeof this.Form.Params[0] == 'string') {
      if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "co") {
        nom_par = 'Proveedor'
        this.prop.Caption = "Análisis de compras";
        tip_car = 'A'
        tip_abo = 'C'
        tip_cop = 'P'
      }
    }
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)

    // armamos documento a imprimir
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

    // asignamos titulo y condiciones a variables del reporte
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
      ` (fec_doc>='${des_fec}' and fec_doc<='${has_fec}') and cop_nom='${tip_cop}'  ${doc_imp} ${where} `

    ins_sql = ` SELECT cod_nom ,MAX(nom_nom) nom_nom,MAX(cop_nom) tip_cop,
   SUM(CASE WHEN coa_tdo='${tip_car}' and cop_nom='${tip_cop}' then (imp_doc*vmo_doc) 
   when coa_tdo='${tip_abo}' and cop_nom='${tip_cop}' then -(imp_doc*vmo_doc)  else 0 end) as imp_doc, 
   SUM(CASE WHEN coa_tdo='${tip_car}' and cop_nom='${tip_cop}' then (ipo_tot*vmo_doc) 
   when coa_tdo='${tip_abo}' and cop_nom='${tip_cop}'  then -(ipo_tot*vmo_doc) else 0 end) as ipo_doc 
   FROM ${this.Form.vis_rep} where ${localWhere}  group by cod_nom union 
   SELECT '000000','Total',MAX(cop_nom),SUM(CASE WHEN coa_tdo='${tip_car}' and cop_nom='${tip_cop}' then (imp_doc*vmo_doc) 
   when coa_tdo='${tip_abo}' and cop_nom='${tip_cop}' then -(imp_doc*vmo_doc)  else 0 end) as imp_doc, 
   SUM(CASE WHEN coa_tdo='${tip_car}' and cop_nom='${tip_cop}' then (ipo_tot*vmo_doc) 
   when coa_tdo='${tip_abo}' and cop_nom='${tip_cop}'  then -(ipo_tot*vmo_doc) else 0 end) 
   FROM ${this.Form.vis_rep} where ${localWhere}  order by imp_doc desc,cod_nom `

    console.log(
      "sqlQuery =",
      ` ${ins_sql} `
    );
    return ` ${ins_sql} `;
  }
} // End ThisForm
