//////////////////////////////////////////////
// BaseClass : reportForm
// Class : report
// Description : Agenda de actividades
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2024-01-19
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportForm } from '@/classes/reportForm/reportForm'
//import { tpy_tpy } from './tpy_tpy'
import { ven_ven } from './ven_ven'
import { est_tap } from './est_tap'
//import { est_pry } from './est_pry'
import { per_pry } from './per_pry'
import { tap_tap } from './tap_tap'
import { equ_equ } from './equ_equ'

export class ThisForm extends reportForm {
  //public tpy_tpy= new tpy_tpy()
  public ven_ven_for = new ven_ven()
  public est_tap_for = new est_tap()
  //public est_pry= new est_pry()
  public per_pry_for = new per_pry()
  public tap_tap_for = new tap_tap()
  public equ_equ_for = new equ_equ()
  constructor() {
    super(0)  // inicializa la clase base
    this.tab_ord = 'vi_rep_comepry_g' // Tabla de donde tomara los campos para el orden de la vista
    this.prop.Name = 'agendaAct'
    this.prop.Caption = "Agenda de actividades"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_rep_comepry_d'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'rep_agenda'   // no incluir extencion jasper o jrxml
    //this.tpy_tpy.prop.TabIndex = 5;
    this.des_fec.prop.TabIndex = 5;
    this.has_fec.prop.TabIndex = 6;
    this.per_pry_for.prop.TabIndex = 4;
    //this.mon_rep.prop.TabIndex = 5;
    this.equ_equ_for.prop.TabIndex = 1;
    this.ven_ven_for.prop.TabIndex = 2;
    // this.est_pry.prop.TabIndex = 7;
    // this.tip_rep.prop.TabIndex = 9;
    this.tap_tap_for.prop.TabIndex = 3;
    this.est_tap_for.prop.TabIndex = 7;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.equ_equ_for,
      [1]: this.ven_ven_for,
      [2]: this.tap_tap_for,
      [3]: this.per_pry_for,
      [4]: this.des_fec,
      [5]: this.has_fec,
      [6]: this.est_tap_for
    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'

    this.block[1].prop.Visible = false
    this.block[1].prop.Disabled = true


    //this.tip_rep.prop.Caption = "Detalle de actividades";

    this.tap_tap_for.prop.Visible = true;
    this.tap_tap_for.prop.Disabled = false;
    this.tip_rep.prop.Visible = false;
    this.tip_rep.prop.Disabled = true;
    this.mon_rep.prop.Visible = false;
    this.mon_rep.prop.Disabled = true;
    this.prop.cam_pri = 'ven_ven' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["ven_ven", "Numero de vendedor", "0", "9999"],
      ["nom_ven", "Nombre de vendedor", "''", "'ZZZZZZZZZZZZ'"]
    ]

  }

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep = this.tip_rep.prop.Value;
    /// const tpy_tpy=this.tpy_tpy.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const est_tap = this.est_tap_for.prop.Value;
    const per_pry = this.per_pry_for.prop.Value;
    const equ_equ = this.equ_equ_for.prop.Value;
    const ven_ven = this.ven_ven_for.prop.Value;
    const tap_tap = this.tap_tap_for.prop.Value;
    const vis_rep = this.vis_rep

    if (ven_ven != 0) {
      if (localWhere.length > 0)
        localWhere = localWhere + ` and ven_ven=${ven_ven} `
      else
        localWhere = localWhere + ` ven_ven=${ven_ven} `
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
    if (tap_tap != "?? ") {
      if (localWhere.length > 0)
        localWhere = localWhere + ` and tap_tap='${tap_tap}' `
      else
        localWhere = localWhere + ` tap_tap='${tap_tap}' `
    }
    else {
      if (localWhere.length > 0)
        localWhere = localWhere + " and "
      localWhere = localWhere + `( est_apy<>'F' or fco_apy<>'19000101' ) `
    }

    if (where.length > 0)
      where = ' AND ' + where

    if (localWhere.length > 0)
      localWhere = localWhere + 'and '
    localWhere = localWhere + ` (( fec_apy>='${des_fec}' AND fec_apy<='${has_fec}' ) or (fpr_apy>='${des_fec}' AND fpr_apy<='${has_fec}')) ` + where;

    //localWhere=localWhere.replaceAll("'",'"')  
    console.log(
      "sqlQuery =",
      ` select * from ${this.vis_rep} WHERE ${localWhere} order by equ_equ,ven_ven,tpy_tpy,ord_tap,con_apy `

    );
    return ` select * from ${this.vis_rep} WHERE ${localWhere} order by equ_equ,ven_ven,tpy_tpy,ord_tap,con_apy  `;


  }

} // End ThisForm


