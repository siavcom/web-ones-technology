//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : Teams
// Description : Documentos
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2023-03-17
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv';
import { imp_img } from './imp_img';
import { tip_cat } from './tip_cat';
export class ThisForm extends reportInv {
  public imp_img = new imp_img()
  public tip_cat = new tip_cat()


  constructor() {
    super(1)  // inicializa la clase base
    this.tab_ord = 'vi_come3201'//'man_comeisu'
    this.prop.Name = 'come3201'
    this.prop.Caption = "Catálogo de insumos"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3201'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3201'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false    // Muestra general odetallado
    this.mon_rep.prop.Visible = false
    this.des_fec.prop.Visible = false
    this.has_fec.prop.Visible = false
    this.op_des_isu.prop.Visible = false
    this.op_has_isu.prop.Visible = false
    this.alm_rep.prop.Visible = false
    this.tip_rep.prop.Disabled = true    // Muestra general odetallado
    this.mon_rep.prop.Disabled = true
    this.des_fec.prop.Disabled = true
    this.has_fec.prop.Disabled = true
    this.op_des_isu.prop.Disabled = true
    this.op_has_isu.prop.Disabled = true
    this.alm_rep.prop.Disabled = true
    this.sep_fam.prop.TabIndex = 1
    this.num_fam.prop.TabIndex = 2
    this.op_des_fam.prop.TabIndex = 3
    this.op_has_fam.prop.TabIndex = 4
    this.tip_cat.prop.TabIndex = 5
    this.tip_cat.prop.Visible = true
    this.tip_cat.prop.Disabled = false
    this.tip_imp.prop.Visible = false
    this.tip_imp.prop.Disabled = true
    this.imp_img.prop.TabIndex = 6
    this.imp_img.prop.Disabled = false
    this.imp_img.prop.Visible = true


    this.block[0].component = {
      [0]: this.imp_img,
      [1]: this.tip_cat,
    }
    this.block[0].prop.Visible = true
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
    this.var_ord.prop.Value = "";
    console.log(
      "===================>Init Report name=",
      this.prop.Name, this,
      "var_ord",
      this.var_ord.prop.Value
    );


  }


  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const ima_pge = this.Form.mPublic.ima_pge;
    const sep_fam = this.sep_fam.prop.Value;
    const op_des_fam = this.op_des_fam.prop.Value;
    const op_has_fam = this.op_has_fam.prop.Value;
    const num_fam = this.num_fam.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    this.Form.con_rep = where
    var pri_cla = 1,
      ult_cla = 29,
      pos_tom = 30,
      var_fam = ' ',
      que_fam = ' des_fa1 ';

    if (sep_fam == 1) {
      if (this.Form.op_has_fam.prop.Value < this.Form.op_des_fam.prop.Value || this.Form.op_has_fam.prop.Value.length == 0)
        this.Form.op_has_fam.prop.Value = "ZZZZZ";
      // número de familia
      const data = await this.Sql.localAlaSql(` select top 1 pri_cla,ult_cla,que_fam from now.loc_comefam where num_fam=${num_fam} `)
      pri_cla = data[0].pri_cla + 1
      pos_tom = data[0].ult_cla - pri_cla
      que_fam = ' ' + data[0].que_fam + ' '
      var_fam = `substring(cla_isu,${pri_cla},${pos_tom}`
      localWhere = ` (${var_fam})>='${op_des_fam}' and ${var_fam})<='${op_has_fam}') `;
    }
    else localWhere = `tin_tti<>' '  `;

    if (where.length > 0)
      where = ' AND ' + where
    localWhere =
      localWhere + where;

    if (this.Form.tip_cat.prop.Value == 1)         // General
    {
      if (this.Form.imp_img.prop.Value == 1) {
        this.Form.for_imp.prop.Value = "jr_come3201_i"
        this.vis_rep = 'vi_come3201_i'   // nombre de la vista sql a utilizar en el reporte

      }
      else {
        this.Form.for_imp.prop.Value = "jr_come3201"
        this.vis_rep = 'vi_come3201'   // nombre de la vista sql a utilizar en el reporte

      }
    }
    if (this.Form.tip_cat.prop.Value == 2)  // detallado
      this.Form.for_imp.prop.Value = "jr_come3201_d";
    if (this.Form.tip_cat.prop.Value == 3)  // solo campos sat
      this.Form.for_imp.prop.Value = "jr_come3201_s";
    if (var_ord != "cla_isu")
      order = order + ',cla_isu'

    console.log(
      "sqlQuery =",
      `select *,${que_fam} as des_fam from ${this.vis_rep} WHERE ${localWhere}  ${order} `
    );
    return `select *,${que_fam} as des_fam  from ${this.vis_rep} WHERE ${localWhere}  ${order}`;
  }



} // End ThisForm
