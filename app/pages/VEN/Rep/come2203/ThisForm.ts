//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : thisForm
// Description : Recuperacion de ventas de vendedores
// @author: MGSR
// Creation : 2025/05/15
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportVen } from '~/classes/Siavcom/reports/VEN/reportVen';
import { fec_bas } from './fec_bas';
import { dia_uno } from './dia_uno';
import { dia_dos } from './dia_dos';
import { dia_tre } from './dia_tre';
import { dia_cua } from './dia_cua';
import { dia_cin } from './dia_cin';
import { dia_sei } from './dia_sei';
import { por_uno } from './por_uno';
import { por_dos } from './por_dos';
import { por_tre } from './por_tre';
import { por_cua } from './por_cua';
import { por_cin } from './por_cin';
import { por_sei } from './por_sei';

export class ThisForm extends reportVen {
  public fec_bas = new fec_bas()
  public dia_uno = new dia_uno()
  public dia_dos = new dia_dos()
  public dia_tre = new dia_tre()
  public dia_cua = new dia_cua()
  public dia_cin = new dia_cin()
  public dia_sei = new dia_sei()
  public por_uno = new por_uno()
  public por_dos = new por_dos()
  public por_tre = new por_tre()
  public por_cua = new por_cua()
  public por_cin = new por_cin()
  public por_sei = new por_sei()

  constructor() {
    super(1)  // inicializa la clase base
    this.tab_ord = 'vi_come2203'//'man_comeisu'
    this.prop.Name = 'come2203'
    this.prop.Caption = "Recuperacion de ventas de vendedores (come2203)"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_come2203'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'jr_come2203'   // no incluir extencion jasper o jrxml
    this.tip_imp.prop.Visible = true    // Muestra general odetallado
    this.mon_rep.prop.Visible = false
    this.des_fec.prop.Visible = true
    this.has_fec.prop.Visible = true
    this.tip_imp.prop.Disabled = false   // Muestra general odetallado
    this.tip_rep.prop.Visible = false
    this.tip_rep.prop.Disabled = true
    this.mon_rep.prop.Disabled = true
    this.des_fec.prop.Disabled = false
    this.has_fec.prop.Disabled = false
    this.dia_uno.prop.TabIndex = 1;
    this.por_uno.prop.TabIndex = 2;
    this.dia_dos.prop.TabIndex = 3;
    this.por_dos.prop.TabIndex = 4;
    this.dia_tre.prop.TabIndex = 5;
    this.por_tre.prop.TabIndex = 6;
    this.dia_cua.prop.TabIndex = 7;
    this.por_cua.prop.TabIndex = 8;
    this.dia_cin.prop.TabIndex = 9;
    this.por_cin.prop.TabIndex = 10;
    this.dia_sei.prop.TabIndex = 11;
    this.por_sei.prop.TabIndex = 12;
    this.des_fec.prop.TabIndex = 13;
    this.has_fec.prop.TabIndex = 14;
    this.fec_bas.prop.TabIndex = 15;
    this.tip_imp.prop.TabIndex = 16;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.dia_uno,
      [1]: this.por_uno,
      [2]: this.dia_dos,
      [3]: this.por_dos,
      [4]: this.dia_tre,
      [5]: this.por_tre,
      [6]: this.dia_cua,
      [7]: this.por_cua,
      [8]: this.dia_cin,
      [9]: this.por_cin,
      [10]: this.dia_sei,
      [11]: this.por_sei
    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Días vencidos/% comisión'

    this.block[1].component = {
      [0]: this.des_fec,
      [1]: this.has_fec,
      [2]: this.fec_bas,
      [3]: this.tip_imp
    }

    this.block[1].prop.Visible = true
    this.block[1].prop.Disabled = false
    this.block[1].title = 'Generales'


    this.block[2].prop.Visible = false
    this.block[2].prop.Disabled = true






    this.prop.cam_pri = 'ven_ven' // campo de busqueda principal



  }
  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const var_ord = this.var_ord.prop.Value;
    const des_fec = dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const fec_bas = this.fec_bas.prop.Value;
    this.Form.for_imp.prop.Value = "jr_come2203"
    this.vis_rep = 'vi_come2203'   // nombre de la vista sql a utilizar en el reporte

    localWhere = ` (fec_Pag>='${des_fec}' and fec_pag<='${has_fec}') `

    order = 'order by ' + var_ord
    if (var_ord == 'zon_ven')
      order = order + ",ven_ven"
    this.Form.tit_rep = this.prop.Caption
    order = order += ',tdo_tdo,ndo_doc'
    if (localWhere.length > 0)
      where = ' AND ' + where
    localWhere =
      localWhere + where;
    var ins_sql = ` 
      select * from ${this.vis_rep} WHERE ${localWhere} 
      ${order} `
    console.log(
      "sqlQuery =",
      `${ins_sql} `
    );
    return ` ${ins_sql} `;
  }

} // End ThisForm
