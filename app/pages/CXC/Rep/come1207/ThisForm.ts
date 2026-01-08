//////////////////////////////////////////////
// BaseClass : reportForm
// Class : ThisForm
// Description : Relación de documentos
// Author : MGSR
// Creation : 2025-06-10
// Update Date  : 2025-06-10
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { reportCXC } from "@/classes/Siavcom/reports/CXC/reportCXC";
import { tip_doc } from "./tip_doc";
import { tip_res } from "./tip_res";
export class ThisForm extends reportCXC {
  public tip_doc = new tip_doc()
  public tip_res = new tip_res()

  constructor() {
    super(0); // inicializa la clase base
    this.tab_ord = "vi_come1207";
    this.prop.Name = "come1207";
    this.prop.Caption = "Relación de documentos";
    this.prop.Status = "A";
    this.prop.Development = true;
    this.vis_rep = "vi_come1207"; // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = "jr_come1207c"; // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false; // Muestra general o detallado
    this.tip_rep.prop.Disabled = true
    this.des_fec.prop.Visible = true; //
    this.has_fec.prop.Visible = true;
    this.des_fec.prop.Disabled = false //
    this.has_fec.prop.Disabled = false;
    this.mon_rep.prop.Visible = true;
    this.cx_tdo_tdo.prop.Visible = true;
    this.cx_tcd_tcd.prop.Visible = true;
    this.cx_tcd_tcd.prop.Disabled = false;
    this.cx_tdo_tdo.prop.Disabled = false;
    this.tip_doc.prop.TabIndex = 1;
    this.cx_tdo_tdo.prop.TabIndex = 2;
    this.cx_tcd_tcd.prop.TabIndex = 3;
    this.mon_rep.prop.TabIndex = 4;
    this.des_fec.prop.TabIndex = 5;
    this.has_fec.prop.TabIndex = 6;
    this.tip_res.prop.TabIndex = 7;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.tip_doc,
      [1]: this.cx_tdo_tdo,
      [2]: this.cx_tcd_tcd,
      [3]: this.des_fec,
      [4]: this.has_fec,
      [5]: this.tip_res
    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'

    this.Form.ini_sem.prop.Value = getDay(PublicVar.fps_pge);
    if (this.Form.ini_sem.prop.Value == 0)
      this.Form.ini_sem.prop.Value = this.Form.ini_sem.prop.Value + 7
    console.log('PublicVar.fps_pge=', PublicVar.fps_pge, 'ini_sem=', getDay(PublicVar.fps_pge))
  }

  public override async init() {
    await super.init();
    this.prop.cam_pri = 'ndo_doc' // campo de buqueda principal
    // Campos de orden de la vista
    var nom_par = 'clientes'
    this.prop.Caption = "Relación de documentos de clientes ";
    this.Form.tit_rep = "Relación de documentos de clientes "
    this.Form.for_imp.prop.Value = "jr_come1207" + this.Form.Params[0].replaceAll("´", "").toLowerCase()
    if (this.Form.Params[0].replaceAll("´", "").toLowerCase() == "p") {
      nom_par = 'proveedores'
      this.prop.Caption = "Relación de documentos de proveedores ";
      this.Form.tit_rep = "Relación de documentos de proveedores "
    }
    this.fields = [
      ["ndo_doc", "Numero de documento ", "1", "99999999"],
      ["cod_nom", "codigo del " + nom_par, "''", "'ZZZZZZZZZZZ'"]

    ]

    this.var_ord.prop.Value = "num_doc";

  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    let has_fec = dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    let des_fec = dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    var var_ord = this.var_ord.prop.Value;
    const mon_rep = this.mon_rep.prop.Value;
    const tip_doc = this.tip_doc.prop.Value;
    const cx_tdo_tdo = this.cx_tdo_tdo.prop.Value;
    const cx_tcd_tcd = this.cx_tcd_tcd.prop.Value;
    const tip_res = this.tip_res.prop.Value;
    // asignamos condiciones de reportes que vienen en where
    this.Form.con_rep = where
    var par_prg = this.Form.Params[0].replaceAll("´", "").toLowerCase()
    if (where.length > 1)
      where = ' and ' + where
    localWhere = localWhere + where;
    console.log(localWhere)
    has_fec = has_fec.replaceAll('-', '')
    des_fec = des_fec.replaceAll('-', '')
    // armamos documentos si hay clasificacion
    var doc_imp = '', tit_rep1 = ' ';

    if (cx_tdo_tdo.trim() != "??") {
      doc_imp = cx_tdo_tdo.replaceAll(",", "','")
      // obtenemos la descripcion de los documentos seleccionados   
      var i = 0, j = doc_imp.length, tdo_tdo = ' ', des_tdo = ','
      for (let i = 0; i < j; i += 6) {
        tdo_tdo = doc_imp.slice(i, i + 3)
        const data = await this.Sql.localAlaSql(` select des_tdo from now.loc_cometdo where tdo_tdo='${tdo_tdo}'  `)
        des_tdo = des_tdo + "," + data[0].des_tdo.trim()
      }
      doc_imp = '  ( tdo_tdo in (' + "'" + doc_imp + "'" + ') '
      tit_rep1 = ' ' + des_tdo.replaceAll(",,", "")

    }
    else
      doc_imp = ` (cop_nom='${par_prg}' and coa_tdo='${tip_doc}' `
    if (cx_tcd_tcd.trim() != "??") {
      doc_imp = doc_imp + ' and tcd_tcd in (' + "'" + cx_tcd_tcd.replaceAll(",", "','") + "'" + ') '
      const data = await this.Sql.localAlaSql(` select des_tcd from now.loc_cometcd where tdo_tdo='${this.in_tdo_tdo.prop.Value}' and tcd_tcd='${this.in_tcd_tcd.prop.Value}'  `)
      tit_rep1 = tit_rep1 + ' ' + data[0].des_tcd.trim()
    }

    if (doc_imp.length > 2)
      doc_imp = doc_imp + ') and '
    console.log('titulo', tit_rep1, 'this.form.tit_rep=', this.Form.tit_rep)
    var que_coac = " coa_tdo='C' ", que_coaa = " coa_tdo='A' ", con_imp = ' '
    if (par_prg == 'p') {
      que_coac = " coa_tdo='A' "
      que_coaa = " coa_tdo='C' "
    }
    var_ord = 'ndo_doc'
    this.Form.ord_vis = 'tdo_tdo,tcd_tcd,fec_doc ,ord_rep,fec_pag'
    if (var_ord == "ndo_doc") {
      if (cx_tdo_tdo.length > 5 || cx_tdo_tdo.trim() == '??') {
        this.Form.ord_vis = 'fec_doc,tdo_tdo,ndo_doc,ord_rep,fec_pag'
        var_ord = 'fec_doc'
        //      thisform.primero.value=thisform.des_fec.value
        //    thisform.ultimo.value=thisform.has_fec.value
      }
      else {
        this.Form.ord_vis = 'ndo_doc,tdo_tdo,fec_doc,ord_rep,fec_pag'
        var_ord = 'ndo_doc'
      }
    }
    this.Form.tit_rep = this.Form.tit_rep + ' ' + tit_rep1
    console.log('titulo', tit_rep1, 'this.form.tit_rep=', this.Form.tit_rep)

    this.Form.con_vis = ` (( ${doc_imp} (fec_doc>='${des_fec}' and fec_doc<='${has_fec}') or 
                fec_doc IS NULL)    
               and mon_doc=${mon_rep}) ${con_imp} `

    var que_opc = ' ', ins_where = ''

    if (tip_res == 2)
      que_opc = ' not between -0.049 and 0.049 '
    if (tip_res == 1)
      que_opc = ' between -0.049 and 0.049 '
    if (tip_res != 3)
      ins_where = `
   		 where (${que_coac} and ((tot_pag is null and imp_tot ${que_opc}) 
		     or (imp_tot-tot_pag) ${que_opc})) or 
		      (${que_coaa} and ((mon_asi is null and imp_tot ${que_opc})
		     or (imp_tot-mon_asi) ${que_opc})) 
    `
    // imp_tot-tot_pag,imp_tot-tot_asi)
    var ins_sql = ` select tdo_tdo,ndo_doc,coa_tdo,tdo_pag,ndo_pag,tia_pag,nua_pag,des_tdo,ord_rep,
  fec_pag,fec_asi,ref_pag,ref_asi,ref_doc,ven_ven,fec_doc,fve_doc,imp_doc,imp_tot,
  im1_doc,im2_doc,im3_doc,cod_nom,nom_nom,des_pag,des_tcd,cop_nom,tot_pag,
  tot_asi,mon_pag,mon_asi
	INTO #RESULTADO from ${this.Form.vis_rep}  where ${this.Form.con_vis} ${localWhere}
  select *  from #RESULTADO 
       order by ${this.Form.ord_vis}
	 drop table #RESULTADO 
   `
    console.log(
      "sqlQuery =", ` ${ins_sql}  `

    );
    return `  ${ins_sql}   `;


  }

} // End ThisForm
