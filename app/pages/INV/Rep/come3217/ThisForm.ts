//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : reportInv
// Description : Captura de inventario fisico
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2025/mzo/06
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
export class ThisForm extends reportInv {

  constructor() {
    super(1)  // inicializa la clase base
    this.tab_ord = 'vi_come3217'
    this.prop.Name = 'come3217'
    this.prop.Caption = "Captura de inventario fisico"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3217'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3217'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false    // 
    this.tip_rep.prop.Disabled = true
    this.tip_imp.prop.Visible = false    // 
    this.tip_imp.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.op_des_isu.prop.Visible = false
    this.op_des_isu.prop.Disabled = true
    this.op_has_isu.prop.Visible = false
    this.op_has_isu.prop.Disabled = true
    this.des_fec.prop.Visible = false
    this.des_fec.prop.Disabled = true
    this.has_fec.prop.TabIndex = 1
    this.alm_rep.prop.TabIndex = 2
    this.has_fec.prop.Caption = 'De la fecha'
    this.prop.cam_pri = 'fol_tif' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["fol_tif", "Folio de captura", "0", "99999999"],
      ["cla_isu", "Clave del insumo", "", "'ZZZZZZZZZZZZZ'"],
      ["des_isu", "Descripción", "", "'ZZZZZZZZZZZZZ'"]
    ]
    // definicion de bloques
    this.block[0].component = {
      [0]: this.has_fec,
      [1]: this.alm_rep

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

    this.block[2].prop.Visible = false
    this.block[2].prop.Disabled = true


  }

  public override async init() {
    await super.init()
    this.var_ord.prop.Value = "fol_tif";
    this.ord_vis = 'nmo_tif';
    this.tip_imp.prop.Value = '1'

  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const alm_rep = this.Form.alm_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const ima_pge = this.Form.mPublic.ima_pge;
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    this.Form.con_rep = where
    // si es por familia
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
      order = ` order by ${var_fam},${var_ord} `
    }


    if (where.length > 0)
      where = ' AND ' + where

    var con_vis = "", ins_sql = "";

    con_vis = `  fec_tif='${has_fec}'   `
    // generamos condicion de almacen
    var sql_alm = 'null'
    if (alm_rep.trim() != '??') {
      sql_alm = "'" + alm_rep + "'"
      con_vis = con_vis + ` and alm_tda='${alm_rep}' `
      const data = await this.Sql.localAlaSql(` select des_tda from now.loc_cometda where alm_tda='${this.alm_rep.prop.Value}' `)
      this.Form.tit_rep = 'Almacen: ' + data[0].des_tda.trim()

    }
    where = where.replaceAll(var_ord, this.vis_rep + "." + var_ord)
    if (localWhere.length > 3)
      localWhere =
        localWhere + ' and '
    localWhere = ` where ${localWhere} ${con_vis} ${where}
    `
    ins_sql = ` select 
    dbo.F_CAL_EXI_GEN(cla_isu,0,'${has_fec}',${sql_alm},
    case when ${this.vis_rep}.ser_tif=' ' then NULL else ser_tif end,NULL,NULL) as cal_exi_gen,
    dbo.F_CAL_EXI_GEN(cla_isu,0,'${has_fec}',${sql_alm},NULL,NULL,NULL) as exi_pro,
    *,${que_fam} as des_fam from ${this.vis_rep}  ${localWhere} ${order} `
    console.log(
      "sqlQuery =", ins_sql
    );
    // pasamos a numerico la variable de orden
    if (this.var_ord.prop.Value == 'fol_tif')
      this.Form.ord_rep = 1
    if (this.var_ord.prop.Value == 'cla_isu')
      this.Form.ord_rep = 2
    if (this.var_ord.prop.Value == 'des_isu')
      this.Form.ord_rep = 3
    console.log("ord_rep=", this.Form.ord_rep)
    return `  ${ins_sql} `;

    //  return ` EXEC p_come3203 '${des_fec}','${has_fec}','${ini_isu}','${fin_isu}','${alm_rep}','${localWhere} ',${tip_rep},${tip_imp},'${var_ord}' `;


  }

} // End ThisForm

