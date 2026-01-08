//////////////////////////////////////////////
// BaseClass : reportForm
// Class : reportInv
// Description : Capas de existencia de productos
// Author : MGSR
// Creation : 2025/02/21
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
export class ThisForm extends reportInv {

  constructor() {
    super(1)  // inicializa la clase base
    this.tab_ord = 'vi_come3211'
    this.prop.Name = 'come3211'
    this.prop.Caption = "Capas de existencia de productos (come3211)"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3211'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3211'   // no incluir extencion jasper o jrxml
    this.tip_imp.prop.Visible = false   // Muestra general odetallado
    this.tip_imp.prop.Disabled = true
    this.tip_rep.prop.Visible = false    // Muestra general odetallado
    this.tip_rep.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.des_fec.prop.Visible = true;
    this.has_fec.prop.Disabled = false;
    this.des_fec.prop.Visible = true;
    this.has_fec.prop.Disabled = false;
    this.op_des_isu.prop.Disabled = true;
    this.op_des_isu.prop.Visible = false;
    this.op_has_isu.prop.Disabled = true;
    this.op_has_isu.prop.Visible = false;
    this.alm_rep.prop.Visible = false;
    this.alm_rep.prop.Disabled = true;
    this.alm_rep.prop.MultiSelect = true;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.des_fec,
      [1]: this.has_fec

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
    const var_ord = this.var_ord.prop.Value;
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    this.Form.con_rep = where
    //var tit_rep='';
    var var_des = ''
    if (var_ord == 'des_isu')
      num_ord = 'D';
    if (var_ord == 'sku_isu')
      num_ord = 'S'

    var pri_cla = 1,
      ult_cla = 29,
      pos_tom = 30,
      var_fam = ' ',
      que_fam = 'des_fa1 ';

    if (sep_fam == 1) {
      if (this.Form.op_has_fam.prop.Value < this.Form.op_des_fam.prop.Value || this.Form.op_has_fam.prop.Value.length == 0)
        this.Form.op_has_fam.prop.Value = "ZZZZZ";
      // nos traemos posicion de la familia
      console.log('estoy en fam:', order)
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
    var ins_sql = ' '
    this.tit_rep = this.prop.Caption

    if (localWhere.length > 3)
      localWhere = localWhere + ' and '
    localWhere =
      localWhere +
      ` (fec_mov>='${des_fec}' AND fec_mov<='${has_fec}') ` + where;

    ins_sql = ` select *,${que_fam} des_fam from  ${this.vis_rep} where ${localWhere} ${order} `
    console.log(
      "sqlQuery =", ins_sql
    );
    return `${ins_sql}  `;


  }

} // End ThisForm

