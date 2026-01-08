//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
// Description : Historico de ventas de vendedores
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
    this.tab_ord = 'vi_come2202'//'man_comeisu'
    this.prop.Name = 'come2202'
    this.prop.Caption = "Historico de ventas de vededores (come2202)"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come2202'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come2202'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false    // Muestra general odetallado
    this.mon_rep.prop.Visible = true
    this.des_fec.prop.Visible = true
    this.has_fec.prop.Visible = true
    this.tip_rep.prop.Disabled = true    // Muestra general odetallado
    this.mon_rep.prop.Disabled = false
    this.des_fec.prop.Disabled = false
    this.has_fec.prop.Disabled = false
    this.des_fec.prop.TabIndex = 1;
    this.has_fec.prop.TabIndex = 2;
    this.mon_rep.prop.TabIndex = 3;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.des_fec,
      [1]: this.has_fec,
      [2]: this.mon_rep
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
    const mon_rep = this.mon_rep.prop.Value;
    const des_fec = dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)

    localWhere = ` (FEC_DOC>='${des_fec}' and FEC_DOC<='${has_fec}' AND MON_DOC=${mon_rep}) `

    order = 'order by ' + var_ord
    if (var_ord == 'zon_ven')
      order = order + ",ven_ven"
    this.Form.tit_rep = this.prop.Caption
    order = order + ',tdo_tdo,ndo_doc,fec_doc,ord_rep,fec_pag'

    if (localWhere.length > 0)
      where = ' AND ' + where
    localWhere =
      localWhere + where;
    var ins_sql = ` select * from ${this.vis_rep} WHERE ${localWhere}  ${order} `
    console.log(
      "sqlQuery =",
      `${ins_sql} `
    );
    return ` ${ins_sql} `;
  }

} // End ThisForm
