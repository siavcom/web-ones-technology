//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
// Description : Análisis de ventas por vendedor
// Author : MGSR
// Creation : 2025/05/15
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportVen } from '~/classes/Siavcom/reports/VEN/reportVen';
export class ThisForm extends reportVen {
  constructor() {
    super(0)  // inicializa la clase base
    this.tab_ord = 'vi_come2204'//'man_comeisu'
    this.prop.Name = 'come2204'
    this.prop.Caption = "Análisis de ventas por vendedor (come2202)"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come2204'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come2204'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false    // Muestra general odetallado
    this.mon_rep.prop.Visible = false
    this.des_fec.prop.Visible = true
    this.has_fec.prop.Visible = true
    this.tip_rep.prop.Disabled = true    // Muestra general odetallado
    this.mon_rep.prop.Disabled = true
    this.des_fec.prop.Disabled = false
    this.has_fec.prop.Disabled = false
    this.des_fec.prop.TabIndex = 1;
    this.has_fec.prop.TabIndex = 2;
    this.prop.cam_pri = 'ven_ven' // campo de busqueda principal
    // definicion de bloques
    this.block[0].component = {
      [0]: this.des_fec,
      [1]: this.has_fec
    }

    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'


    this.block[1].prop.Visible = false
    this.block[1].prop.Disabled = true



  }

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const var_ord = this.var_ord.prop.Value;
    const des_fec = dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)

    localWhere = ` (FEC_DOC>='${des_fec}' and FEC_DOC<='${has_fec}') `
    var con_vis = localWhere
    order = 'order by ' + var_ord
    if (var_ord == 'zon_ven')
      order = order + ",ven_ven"
    this.Form.tit_rep = this.prop.Caption

    if (localWhere.length > 0)
      where = ' AND ' + where
    localWhere =
      localWhere + where;
    var ins_sql = `  exec p_cal_cos_pro_deh '','ZZZZZZZZZZ','C'; 
      select ven_ven,max(nom_ven) as nom_ven,SUM(CAR_DOC) AS car_doc,SUM(ABO_DOC) as abo_doc,
      sum(cos_cap) as cos_doc from ${this.vis_rep} WHERE ${localWhere} group by ven_ven
      union
      SELECT -1,'-1',sum(case when coa_tdo='C' then IMP_DOC*VMO_DOC else -(IMP_DOC*VMO_DOC) end) ,
       0,0
      from man_comedoc 
      join man_cometdo on man_comedoc.tdo_tdo=man_cometdo.tdo_tdo 
 	     where man_comedoc.cop_nom='C' and ((coa_tdo='C' and inv_tdo ='S') or coa_tdo='A') and ven_ven>0 and 
      ${con_vis}
      ${order} `
    console.log(
      "sqlQuery =",
      `${ins_sql} `
    );
    return ` ${ins_sql} `;
  }

} // End ThisForm
