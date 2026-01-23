//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : thisform
// Description : Reporte de proyectos
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2023-03-17
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportForm } from '@/classes/reportForm/reportForm'
import { op_tpy_tpy } from './op_tpy_tpy'
import { ven_ven } from './ven_ven'
import { op_est_tap } from './op_est_tap'
import { est_pry } from './est_pry'
import { per_pry } from './per_pry'
import { op_tap_tap } from './op_tap_tap'
import { equ_equ } from './equ_equ'
import { tip_imp } from './tip_imp'
import { des_fac } from './des_fac'
import { has_fac } from './has_fac'

export class ThisForm extends reportForm {
  public op_tpy_tpy = new op_tpy_tpy()
  public op_ven_ven = new ven_ven()
  public op_est_tap = new op_est_tap()
  public op_est_pry = new est_pry()
  public op_per_pry = new per_pry()
  public op_tap_tap = new op_tap_tap()
  public des_fac = new des_fac()
  public has_fac = new has_fac()
  public op_equ_equ = new equ_equ()
  public tip_imp = new tip_imp()
  constructor() {
    super(1)  // inicializa la clase base
    this.tab_ord = 'vi_rep_comepry_g' // Tabla de donde tomara los campos para el orden de la vista
    this.prop.Name = 'comepry'
    this.prop.Caption = "Proyectos"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_rep_comepry'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'rep_comepry'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible = false;
    this.tip_rep.prop.Disabled = true;
    this.tip_imp.prop.Visible = true;
    this.tip_imp.prop.Disabled = false;
    this.des_fac.prop.Visible = false;
    this.des_fac.prop.Disabled = true;
    this.has_fac.prop.Visible = false;
    this.has_fac.prop.Disabled = true;
    this.des_fac.prop.Caption = "Desde la fecha de actividad";
    this.has_fac.prop.Caption = "Hasta la fechade actividad";
    this.op_tpy_tpy.prop.TabIndex = 1;
    this.des_fec.prop.TabIndex = 2;
    this.has_fec.prop.TabIndex = 3;
    this.op_per_pry.prop.TabIndex = 4;
    this.mon_rep.prop.TabIndex = 5;
    this.op_equ_equ.prop.TabIndex = 6;
    this.op_ven_ven.prop.TabIndex = 8;
    this.op_est_pry.prop.TabIndex = 7;
    this.tip_imp.prop.TabIndex = 9;
    this.op_tap_tap.prop.TabIndex = 10;
    this.des_fac.prop.TabIndex = 11;
    this.has_fac.prop.TabIndex = 12;
    this.op_est_tap.prop.TabIndex = 13;

    // definicion de bloques
    this.block[0].component = {
      [0]: this.op_tpy_tpy,
      [1]: this.des_fec,
      [2]: this.has_fec,
      [3]: this.op_per_pry,
      [4]: this.mon_rep,
      [5]: this.op_equ_equ,
      [6]: this.op_est_pry,
      [7]: this.op_ven_ven

    }
    this.block[1].component = {
      [0]: this.tip_imp,
      [1]: this.op_tap_tap,
      [2]: this.des_fac,
      [3]: this.has_fac,
      [4]: this.op_est_tap
    }

    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'

    this.block[1].prop.Visible = true
    this.block[1].prop.Disabled = false
    this.block[1].title = 'Actividades'

    this.block[2].prop.Visible = false
    this.block[2].prop.Disabled = true


    this.prop.cam_pri = 'ven_ven' // campo de buqueda principal

    // Campos de orden de la vista
    this.fields = [
      ["ven_ven", "Numero de vendedor", "0", "9999"],
      ["nom_ven", "Nombre de vendedor", "''", "'ZZZZZZZZZZZZ'"],
      ["num_pry", "Numero de proyecto", "0", "99999999"],
      ["cod_nom", "Codigo del cliente", "''", "'ZZZZZZ'"]
    ]


    // }
    // public async init(){
    // await super.init()
    this.des_fac.prop.Value = this.mPublic.fpo_pge
    this.has_fac.prop.Value = this.mPublic.fpo_pge
    this.has_fac.prop.Min = this.des_fac.prop.Value



  }
  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const des_fac = await dateToSql(this.Form.des_fac.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fac = await dateToSql(this.Form.has_fac.prop.Value); //dateToSql(this.Form.has_fec.Value)
    var tip_rep = this.tip_imp.prop.Value;
    const tpy_tpy = this.op_tpy_tpy.prop.Value;
    const mon_rep = this.mon_rep.prop.Value;
    const est_tap = this.op_est_tap.prop.Value;
    const est_pry = this.op_est_pry.prop.Value;
    const per_pry = this.op_per_pry.prop.Value;
    const equ_equ = this.op_equ_equ.prop.Value;
    const ven_ven = this.op_ven_ven.prop.Value;
    const tap_tap = this.op_tap_tap.prop.Value;
    //this.ord_vis="tpy_tpy"

    if (tpy_tpy != "?? ") {
      if (localWhere.length > 0)
        localWhere = localWhere + ` and tpy_tpy='${tpy_tpy}' `
      else
        localWhere = localWhere + ` tpy_tpy='${tpy_tpy}' `
    }
    if (ven_ven != 0) {
      if (localWhere.length > 0)
        localWhere = localWhere + ` and ven_ven=${ven_ven} `
      else
        localWhere = localWhere + ` ven_ven=${ven_ven} `
    }
    if (est_pry != "T") {
      if (localWhere.length > 0)
        localWhere = localWhere + ` and est_pry='${est_pry}' `
      else
        localWhere = localWhere + ` est_pry='${est_pry}' `
    }


    if (equ_equ != "??") {
      if (localWhere.length > 0)
        localWhere = localWhere + ` and equ_equ='${equ_equ}' `
      else
        localWhere = localWhere + ` equ_equ='${equ_equ}' `
    }

    if (per_pry != "T") {
      if (localWhere.length > 0)
        localWhere = localWhere + ` and per_pry='${per_pry}' `
      else
        localWhere = localWhere + ` per_pry='${per_pry}' `
    }
    if (mon_rep != 0) {
      if (localWhere.length > 0)
        localWhere = localWhere + ` and mco_pry=${mon_rep} `
      else
        localWhere = localWhere + ` mco_pry=${mon_rep} `
    }

    if (tip_rep == 1) {
      if (est_tap != "T") {
        if (localWhere.length > 0)
          localWhere = localWhere + ` and est_apy='${est_tap}' `
        else
          localWhere = localWhere + ` est_apy='${est_tap}' `
      }
      if (tap_tap != "?? ") {
        if (localWhere.length > 0)
          localWhere = localWhere + ` and tap_tap='${tap_tap}' `
        else
          localWhere = localWhere + ` tap_tap='${tap_tap}' `
      }

      if (localWhere.length > 0)
        localWhere = localWhere + ` and fec_apy>='${des_fac}' AND fec_apy<='${has_fac}' `
      else
        localWhere = localWhere + ` fec_apy>='${des_fac}' AND fec_apy<='${has_fac}' `
    }

    if (where.length > 0)
      where = ' AND ' + where

    if (localWhere.length > 0)
      localWhere = localWhere + 'and '
    localWhere = localWhere + `  fec_pry>='${des_fec}' AND fec_pry<='${has_fec}' ` + where;
    var var_ord = "," + this.var_ord.prop.Value.trim()
    if (var_ord == ",num_pry") {
      if (tip_rep == 1)
        order = "order by tpy_tpy,num_pry,tap_tap,ord_tap,con_apy"
      else
        order = "order by tpy_tpy,num_pry"
    }
    else
      order = order.replaceAll(var_ord, "")

    //localWhere=localWhere.replaceAll("'",'"')  
    console.log(
      "sqlQuery =",
      ` select * from ${this.vis_rep} WHERE ${localWhere}  ${order} `

    );
    return ` select * from ${this.vis_rep} WHERE ${localWhere}  ${order} `;


  }

} // End ThisForm


