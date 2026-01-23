//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : thisform
// Description : Lista de precios
// @author: MGSR
// Creation : 2025-01-23
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
import { imp_exi } from './imp_exi'
import { pre_cer } from './pre_cer'
import { tip_pre } from './tip_pre'
export class ThisForm extends reportInv {
  public imp_exi = new imp_exi()
  public pre_cer = new pre_cer()
  public tip_pre = new tip_pre()
  constructor() {
    super(1)  // inicializa la clase base
    this.tab_ord = 'vi_come3208'
    this.prop.Name = 'come3208'
    this.prop.Caption = "Lista de precios"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3208'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3208'   // no incluir extencion jasper o jrxml
    // deshabilitamos elementos que no se utilizaran
    this.tip_rep.prop.Visible = false    // Muestrafalseeral odetallado
    this.tip_rep.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.des_fec.prop.Visible = false
    this.des_fec.prop.Disabled = true
    this.has_fec.prop.Visible = false
    this.has_fec.prop.Disabled = true
    this.op_des_isu.prop.Visible = false
    this.op_des_isu.prop.Disabled = true
    this.op_has_isu.prop.Visible = false
    this.op_has_isu.prop.Disabled = true
    this.tip_imp.prop.Visible = false
    this.tip_imp.prop.Disabled = true
    // habilitamos elementos que si utilizaran
    this.alm_rep.prop.Visible = true
    this.alm_rep.prop.Disabled = false
    this.sep_fam.prop.Visible = true
    this.sep_fam.prop.Disabled = false
    // damos orden a los elementos
    this.tip_pre.prop.TabIndex = 1
    this.imp_exi.prop.TabIndex = 2
    this.pre_cer.prop.TabIndex = 3
    this.alm_rep.prop.TabIndex = 4
    this.sep_fam.prop.TabIndex = 5
    this.tip_pre.prop.Value = 'A'
    this.imp_exi.prop.Value = 0
    this.pre_cer.prop.Value = 0

    // definicion de bloques
    this.block[0].component = {
      [0]: this.tip_pre,
      [1]: this.imp_exi,
      [2]: this.pre_cer,
      [3]: this.alm_rep
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


  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    var localWhere = "";
    var alm_rep = this.Form.alm_rep.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const ima_pge = this.Form.mPublic.ima_pge;
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    const imp_exi = this.imp_exi.prop.Value;
    const pre_cer = this.pre_cer.prop.Value;
    const tip_pre = this.tip_pre.prop.Value;
    var fec_exi_q = this.Form.mPublic.fpo_pge;
    this.Form.con_rep = where
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
    // generamos titulo del reporte
    var tit_rep = ''
    if (this.alm_rep.prop.Value != '?? ') {
      const data = await this.Sql.localAlaSql(` select des_tda from now.loc_cometda where alm_tda='${alm_rep}' `)
      tit_rep = ' almacén ' + data[0].des_tda.trim()
    }

    this.Form.tit_rep = tit_rep


    if (alm_rep.trim() == '??')
      alm_rep = 'NULL'
    else
      alm_rep = "'" + alm_rep + "'"
    if (localWhere.length < 3)
      localWhere = " tin_tti in ('P','S') ";
    if (where.length > 0)
      localWhere = localWhere + 'AND ' + where;
    if (pre_cer == 0) {
      var que_pre = 'pv' + tip_pre + '_isu'
      if (tip_pre == 6)
        que_pre = 'pu1_pro'
      if (tip_pre == 7)
        que_pre = 'cst_isu'
      localWhere = localWhere + ` and ${que_pre}>0 `
      console.log('precio=', que_pre)
    }
    // localWhere=localWhere.replaceAll("'",'"')

    fec_exi_q = fec_exi_q.replaceAll('-', '')
    if (imp_exi == 1)
      localWhere = `  
         SELECT  dbo.F_CAL_EXI_GEN(CLA_isu,0,'${fec_exi_q}',${alm_rep},NULL,NULL,NULL) as con_exi,
       ${que_fam} as des_fam,* from  ${this.vis_rep} where ${localWhere}  ${order}; `
    else
      localWhere = `  
        SELECT  0.00 as con_exi,${que_fam} as des_fam,* from  ${this.vis_rep} where ${localWhere}  ${order}; `

    console.log(
      "sqlQuery =", localWhere
    );
    //return ` select top 1 * from ${this.vis_rep}  `;
    return `${localWhere}  `;


  }

} // End ThisForm

