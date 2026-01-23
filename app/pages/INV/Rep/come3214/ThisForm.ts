//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : reportInv
// Description : Relación de productos importados
// @author: MGSR
// Creation : 2025-03-07
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
import { in_tdo_tdo } from '~/classes/Siavcom/reports/INV/in_tdo_tdo'
import { in_tcd_tcd } from '~/classes/Siavcom/reports/INV/in_tcd_tcd'
export class ThisForm extends reportInv {
  public in_tdo_tdo = new in_tdo_tdo()
  public in_tcd_tcd = new in_tcd_tcd()


  constructor() {
    super(0)  // inicializa la clase base
    this.tab_ord = 'vi_come3214'
    this.prop.Name = 'come3214'
    this.prop.Caption = "Relación de productos importados "
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3214'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3214'   // no incluir extencion jasper o jrxml

    // deshabilitamos elementos que no se usan en este reporte
    this.tip_rep.prop.Visible = false    // Muestra general odetallado
    this.tip_rep.prop.Disabled = true
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.alm_rep.prop.Visible = false;
    this.alm_rep.prop.Disabled = true;
    this.op_des_isu.prop.Visible = false;
    this.op_des_isu.prop.Disabled = true;
    this.op_has_isu.prop.Visible = false;
    this.op_has_isu.prop.Disabled = true;
    this.sep_fam.prop.Visible = false;
    this.sep_fam.prop.Disabled = true;
    this.tip_imp.prop.Visible = false;
    this.tip_imp.prop.Disabled = true;

    // habilitamos elementos de este reporte
    this.in_tdo_tdo.prop.Visible = true;
    this.in_tdo_tdo.prop.Disabled = false;
    // deshabilitamos elementos que que se activaran en su momento
    this.in_tcd_tcd.prop.Visible = false;
    this.in_tcd_tcd.prop.Disabled = true;

    // damos orden a los elementos que se muestran
    this.in_tdo_tdo.prop.TabIndex = 1;
    this.des_fec.prop.TabIndex = 2;
    this.has_fec.prop.TabIndex = 3;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.in_tdo_tdo,
      [1]: this.des_fec,
      [2]: this.has_fec

    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'

    this.block[1].prop.Visible = false
    this.block[1].prop.Disabled = true

    this.prop.cam_pri = 'cod_nom' // campo de buqueda principal
    // definimos campos para seleccionar orden dentro del reporte
    this.fields = [
      ["cod_nom", "Código ", "'' ", "'ZZZZZZZZZZZZ'"],
      ["nom_nom", "Nombre ", "'' ", "'ZZZZZZZZZZZZ'"]

    ]
    this.var_ord.prop.Value = "cod_nom";    // campo de orden de default
    this.ord_vis = "cla_isu,ped_ped ,fec_doc"  // campos de orden de la vista


  }

  public override async init() {
    await super.init()
    //  this.var_ord.prop.Value = "";

    // de acuerdo a parametro, se llena el combo de documentos de clientes o proveedores y textos
    let par_for = this.Form.Params[0]
    par_for = par_for.replaceAll("´", "")
    /*   this.in_tdo_tdo.prop.RowSource =
        ` select des_tdo,tdo_tdo,inv_tdo from now.loc_cometdo where inv_tdo in ('E','S') and 
        cop_nom='${par_for}' union select '  Todos ' as des_tdo,'?? ' as tdo_tdo,'N' as inv_tdo order by des_tdo `
    */
    if (par_for == "C")
      this.prop.Caption = "Relación de productos importados de Clientes"
    else
      this.prop.Caption = "Relación de productos importados de Proveedores"

  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const var_ord = this.var_ord.prop.Value;
    const ima_pge = this.Form.mPublic.ima_pge;
    var tit_rep1 = ""
    let par_for = this.Form.Params[0].replaceAll("´", "")
    this.Form.con_rep = where

    if (this.in_tdo_tdo.prop.Value != "?? ") {
      localWhere = ` tdo_tdo='${this.in_tdo_tdo.prop.Value}' AND `
      const data = await this.Sql.localAlaSql(` select des_tdo from now.loc_cometdo where tdo_tdo='${this.in_tdo_tdo.prop.Value}' `)
      tit_rep1 = 'Documento: ' + data[0].des_tdo.trim()

    }
    this.Form.tit_rep = tit_rep1
    localWhere =
      localWhere + ` (fec_doc>='${des_fec}' and fec_doc<='${has_fec}') and cop_nom='${par_for}' `
    if (where.length > 3)
      localWhere = localWhere + 'and ' + where;

    // localWhere = localWhere.replaceAll("'", '"')
    console.log(
      "sqlQuery =",
      `select * from ${this.vis_rep} WHERE ${localWhere} ${order} `
    );
    return `select * from ${this.vis_rep} WHERE ${localWhere} ${order} `;



  }

} // End ThisForm

