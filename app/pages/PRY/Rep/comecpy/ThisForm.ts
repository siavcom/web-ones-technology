//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : thisForm
// Description : report 
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2024-10-04
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportForm } from '@/classes/reportForm/reportForm'
import { op_tpy_tpy } from './op_tpy_tpy'
import { ven_ven } from './ven_ven'
import { est_pry } from './est_pry'
import { per_pry } from './per_pry'
import { equ_equ } from './equ_equ'
import { ver_cot } from './ver_cot'
import { des_cot } from './des_cot'
import { has_cot } from './has_cot'

export class ThisForm extends reportForm {
  public opc_tpy_tpy = new op_tpy_tpy()
  public opc_ven_ven = new ven_ven()
  public opc_est_pry = new est_pry()
  public opc_per_pry = new per_pry()
  public opc_equ_equ = new equ_equ()
  public ver_cot = new ver_cot()
  public des_cot = new des_cot()
  public has_cot = new has_cot()

  constructor() {
    super(0)  // inicializa la clase base
    this.tab_ord = 'vi_rep_comecpy' // Tabla de donde tomara los campos para el orden de la vista
    this.prop.Name = 'comecry'
    this.prop.Caption = "Cotizaciones"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_rep_comecpy'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'rep_comecpy'   // no incluir extencion jasper o jrxml
    this.opc_tpy_tpy.prop.TabIndex = 1;
    this.des_fec.prop.TabIndex = 2;
    this.has_fec.prop.TabIndex = 3;
    this.opc_per_pry.prop.TabIndex = 4;
    this.mon_rep.prop.TabIndex = 5;
    this.opc_equ_equ.prop.TabIndex = 6;
    this.opc_ven_ven.prop.TabIndex = 7;
    this.opc_est_pry.prop.TabIndex = 8;
    this.ver_cot.prop.TabIndex = 9,
      this.des_cot.prop.TabIndex = 10;
    this.has_cot.prop.TabIndex = 11;
    // definicion de bloques
    this.block[0].component = {
      [0]: this.opc_tpy_tpy,
      [1]: this.des_fec,
      [2]: this.has_fec,
      [3]: this.opc_per_pry,
      [4]: this.mon_rep,
      [5]: this.opc_equ_equ,
      [6]: this.opc_ven_ven,
      [7]: this.opc_est_pry
    }
    this.block[1].component = {
      [0]: this.ver_cot,
      [1]: this.des_cot,
      [2]: this.has_cot

    }
    this.block[0].prop.Visible = true
    this.block[0].prop.Disabled = false
    this.block[0].title = 'Generales'

    this.block[1].prop.Visible = true
    this.block[1].prop.Disabled = false
    this.block[1].title = 'Cotización'

    //   this.block[2].prop.Visible = false
    // this.block[2].prop.Disabled = true

    this.tip_rep.prop.Visible = false;
    this.tip_rep.prop.Disabled = true;

    this.prop.cam_pri = 'num_pry' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["num_pry", "Numero de proyecto", "0", "99999999"],
      ["cod_nom", "Codigo cliente o proveedor", "''", "'ZZZZZZZZZZZZ'"],
      ["nom_nom", "Nombre ", "''", "'ZZZZZZZZZZZZZZZZZZ'"]
    ]


  }
  public async init() {
    await super.init()
    //this.des_fac.prop.Value=this.mPublic.fpo_pge
    // this.has_fac.prop.Value=this.mPublic.fpo_pge
    // this.has_fac.prop.Min=this.des_fac.prop.Value


  }
  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string, order: string) {
    let localWhere = "";
    const des_fec = await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec = await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    //const des_fac =await dateToSql(this.Form.des_fac.prop.Value); //dateToSql(this.Form.des_fec.Value)
    //const has_fac =await dateToSql(this.Form.has_fac.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep = this.tip_rep.prop.Value;
    const tpy_tpy = this.opc_tpy_tpy.prop.Value;
    const var_ord = this.var_ord.prop.Value;
    const mon_rep = this.mon_rep.prop.Value;
    const est_pry = this.opc_est_pry.prop.Value;
    const per_pry = this.opc_per_pry.prop.Value;
    const equ_equ = this.opc_equ_equ.prop.Value;
    const ven_ven = this.opc_ven_ven.prop.Value;
    const ver_cot = this.ver_cot.prop.Value;
    const des_cot = this.des_cot.prop.Value;
    const has_cot = this.has_cot.prop.Value;
    // const tap_tap=this.tap_tap.prop.Value;
    const vis_rep = this.vis_rep

    if (tpy_tpy != "?? ") {
      if (localWhere.length > 0)
        localWhere = localWhere + ` and  `
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
      if (localWhere.length > 0) {
        localWhere = localWhere + ` and  `

        localWhere = localWhere + ` mco_pry=${mon_rep} `
      }
    }

    if (ver_cot == "N") {

      if (localWhere.length > 0)
        localWhere = localWhere + ` and `
      localWhere = localWhere + `  (ver_cpy>=${des_cot} and ver_cpy<=${has_cot} )  `
      if (des_cot == has_cot)
        this.for_imp.prop.Value = 'cotizacion'
    }
    if (ver_cot == "U") {
      if (localWhere.length > 0)
        localWhere = localWhere + ` and  `
      localWhere = localWhere + `  (ver_cpy=(
select top 1 ver_cpy from man_comecpy where tpy_tpy=vi_rep_comecpy.tpy_tpy and num_pry=vi_rep_comecpy.num_pry
order by ver_cpy desc)) `
    }




    if (where.length > 0)
      where = ' AND ' + where

    if (localWhere.length > 0)
      localWhere = localWhere + 'and '
    localWhere = localWhere + `  fec_pry>='${des_fec}' AND fec_pry<='${has_fec}' ` + where;

    //localWhere=localWhere.replaceAll("'",'"')  
    console.log(
      "sqlQuery =",
      ` select * from ${this.vis_rep} WHERE ${localWhere}  order by tpy_tpy,num_pry,ver_cpy  `

    );
    return ` select * from ${this.vis_rep} WHERE ${localWhere}  order by tpy_tpy,num_pry,ver_cpy `;


  }

} // End ThisForm


