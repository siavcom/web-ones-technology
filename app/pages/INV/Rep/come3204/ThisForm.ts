//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : Teams
// Description : Reporte de existencias
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2023-03-17
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/Siavcom/reports/INV/reportInv'
import { tip_doc } from './tip_doc'
import { in_tdo_tdo } from '~/classes/Siavcom/reports/INV/in_tdo_tdo'
import { in_tcd_tcd } from '~/classes/Siavcom/reports/INV/in_tcd_tcd'
export class ThisForm extends reportInv {
  public tip_doc = new tip_doc()
  public in_tdo_tdo = new in_tdo_tdo()
  public in_tcd_tcd = new in_tcd_tcd()

  constructor() {
    super(0)  // inicializa la clase base
    this.tab_ord = 'vi_come3204'
    this.prop.Name = 'come3204'
    this.prop.Caption = "Entradas y salidas"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come3204'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come3204'   // no incluir extencion jasper o jrxml

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
    this.tip_doc.prop.Visible = true;
    this.tip_doc.prop.Disabled = false;

    // damos orden a los elementos que se muestran
    this.tip_doc.prop.TabIndex = 1;
    this.in_tdo_tdo.prop.TabIndex = 2;
    this.in_tcd_tcd.prop.TabIndex = 3;
    this.des_fec.prop.TabIndex = 4;
    this.has_fec.prop.TabIndex = 5;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.tip_doc,
      [1]: this.in_tdo_tdo,
      [2]: this.in_tcd_tcd,
      [3]: this.des_fec,
      [4]: this.has_fec
    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'

    this.block[1].prop.Visible = false
    this.block[1].prop.Disabled = true

    this.prop.cam_pri = 'ndo_doc' // campo de buqueda principal
    // definimos campos para seleccionar orden dentro del reporte
    this.fields = [
      ['ndo_doc', 'Número de documento ', "", "99999999"],
      ["cod_nom", "Código ", "'' ", "'ZZZZZZZZZZZZ'"]
    ]
    this.var_ord.prop.Value = "ndo_doc";    // campo de orden de default
    this.ord_vis = "tdo_tdo,tcd_tcd,mov_mov"  // campos de orden de la vista
  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    console.log('where=', where)
    //    this.openFilters()
    //    console.log('despues de filter swhere=', where)

    let localWhere = "";
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const var_ord = this.var_ord.prop.Value;
    const ima_pge = this.Form.mPublic.ima_pge;
    const in_tdo_tdo = this.in_tdo_tdo.prop.Value
    const in_tcd_tcd = this.Form.in_tcd_tcd.prop.Value
    var tip_doc = 'E'
    if (this.tip_doc.prop.Value == 2)
      tip_doc = 'S'
    this.Form.con_rep = where
    var tit_rep = ''
    console.log('tdo_tdo=', in_tdo_tdo, 'tcd_tcd=', in_tcd_tcd)
    if (in_tdo_tdo.trim() != "??") {
      // obtenemos la descripcion de los documentos seleccionados   
      const data = await this.Sql.localAlaSql(` select des_tdo from now.loc_cometdo where tdo_tdo='${in_tdo_tdo}'  `)
      tit_rep = tit_rep + 'Documento: ' + data[0].des_tdo.trim()

      if (in_tcd_tcd.trim() != '??') {
        const data = await this.Sql.localAlaSql(` select des_tcd from now.loc_cometcd where tdo_tdo='${in_tdo_tdo}' and tcd_tcd='${in_tcd_tcd}'`)
        tit_rep = tit_rep + ' ' + data[0].des_tcd.trim()
        localWhere = ` (tdo_tdo='${in_tdo_tdo}' AND  tcd_tcd='${in_tcd_tcd}') and `;

      }
      else localWhere = ` tdo_tdo='${in_tdo_tdo}' AND `
    }
    else {
      if (this.var_ord.prop.Value == "ndo_doc") {
        order = " order by tdo_tdo,ndo_doc,tcd_tcd,mov_mov"
      }
      else {
        order = " order by " + this.var_ord.prop.Value + ",tdo_tdo,ndo_doc,tcd_tcd,mov_mov"
      }
      localWhere = ` inv_tdo='${tip_doc}' and  `
    }
    if (this.Form.in_tcd_tcd.prop.Value != '??')
      localWhere = localWhere + ` tcd_tcd='${this.Form.in_tcd_tcd.prop.Value}' AND `
    localWhere =
      localWhere + ` fec_mov>='${des_fec}' and fec_mov<='${has_fec}' and ` + where;

    // localWhere = localWhere.replaceAll("'", '"')
    console.log(
      "sqlQuery =",
      `select * from ${this.vis_rep} WHERE ${localWhere} ${order} `
    );
    return `select * from ${this.vis_rep} WHERE ${localWhere} ${order} `;



  }

} // End ThisForm

