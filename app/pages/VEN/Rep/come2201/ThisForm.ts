//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
// Description : Documentos
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-03-17
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportVen } from '~/classes/Siavcom/reports/VEN/reportVen';
export class ThisForm extends reportVen {
  constructor() {
    super(0)  // inicializa la clase base
    this.tab_ord = 'vi_come2201'//'man_comeisu'
    this.prop.Name = 'come2201'
    this.prop.Caption = "Catálogo de vendedores (come2201)"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come2201'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come2201'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false    // Muestra general odetallado
    this.mon_rep.prop.Visible = false
    this.des_fec.prop.Visible = false
    this.has_fec.prop.Visible = false
    this.tip_rep.prop.Disabled = true    // Muestra general odetallado
    this.mon_rep.prop.Disabled = true
    this.des_fec.prop.Disabled = true
    this.has_fec.prop.Disabled = true

    this.block[0].prop.Visible = false
    this.block[0].prop.Disabled = true
    this.block[1].prop.Visible = false
    this.block[1].prop.Disabled = true

  }
  public async init() {
    await super.init()
    this.var_ord.prop.Value = "";
    console.log(
      "===================>Init Report name=",
      this.prop.Name,
      "var_ord",
      this.var_ord.prop.Value
    );

  }
  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const var_ord = this.var_ord.prop.Value;
    if (var_ord == 'zon_ven')
      order = order + ",ven_ven"
    this.Form.tit_rep = 'Catálogo de vendedores'
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
