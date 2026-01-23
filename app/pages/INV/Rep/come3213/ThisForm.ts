//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : reportInv
// Description : Historial de porductos por pedimento
// @author: MGSR
// Creation : 2025/03/03
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
export class ThisForm extends reportInv {

  constructor() {
    super(1)  // inicializa la clase base
    this.tab_ord = 'vi_come3212'
    this.prop.Name = 'come3213'
    this.prop.Caption = "Historial de porductos por pedimento"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3212'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3213'   // no incluir extencion jasper o jrxml
    this.tip_imp.prop.Visible = false   // Muestra general odetallado
    this.tip_imp.prop.Disabled = true
    this.tip_rep.prop.Visible = false    // Muestra general odetallado
    this.tip_rep.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.des_fec.prop.Visible = true;
    this.des_fec.prop.Disabled = false;
    this.has_fec.prop.Visible = true;
    this.has_fec.prop.Disabled = false;
    this.op_des_isu.prop.Disabled = true;
    this.op_des_isu.prop.Visible = false;
    this.op_has_isu.prop.Disabled = true;
    this.op_has_isu.prop.Visible = false;
    this.alm_rep.prop.Visible = false;
    this.alm_rep.prop.Disabled = true;
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
    this.ord_vis = "ped_ped,fec_mov,inv_tdo"
  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    //  const des_fec =await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const var_ord = this.var_ord.prop.Value;
    const ima_pge = this.Form.mPublic.ima_pge;
    const sep_fam = this.sep_fam.prop.Value;
    const des_fam = this.op_des_fam.prop.Value;
    const has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    this.Form.con_rep = where
    var tit_rep = '';
    var var_des = ''
    if (var_ord == 'des_isu')
      num_ord = 'D';
    if (var_ord == 'sku_isu')
      num_ord = 'S'

    var pri_cla = 0,
      ult_cla = 29,
      pos_tom = 30,
      fam_num = 1,
      ord_vis = this.ord_vis = "ped_ped,fec_mov,inv_tdo",
      cn_i = 0;

    if (sep_fam == 1) {
      pri_cla = 0;
      //ult_cla=ima_pge.trim.length;
      console.log("ult_cla=" + ult_cla)
      if (this.Form.op_has_fam.prop.Value < this.Form.op_des_fam.prop.Value || this.Form.op_has_fam.prop.Value.length == 0)
        this.Form.op_has_fam.prop.value = "ZZZZZ";
      // número de familia

      while (cn_i > -1 && fam_num <= num_fam) {
        cn_i = ima_pge.indexOf('-', cn_i + 1)
        if (cn_i > -1) {
          if (fam_num == num_fam)
            ult_cla = cn_i
          else
            pri_cla = cn_i + 1
          fam_num = fam_num + 1
        }

      }
      pos_tom = ult_cla - pri_cla;
      pri_cla = pri_cla + 1;
      localWhere = localWhere + ` (substring(cla_isu,${pri_cla},${pos_tom})>='${des_fam}' and substring(cla_isu,${pri_cla},${pos_tom})<='${has_fam}') `;

    }
    if (where.length > 0)
      where = ' AND ' + where
    var ins_sql = ' '

    if (localWhere.length > 3)
      localWhere = localWhere + ' and '
    localWhere =
      localWhere +
      `  ( fec_ped>='${des_fec}' and  fec_ped<='${has_fec}' ) ` + where;
    ins_sql = ` 
      SELECT * from  ${this.vis_rep}
	    where ${localWhere} ${order} 
   
    `
    console.log(
      "sqlQuery =", ins_sql
    );
    //return ` select * from  ${this.vis_rep} where ${localWhere} ${order} `
    return `${ins_sql}  `;


  }

} // End ThisForm

