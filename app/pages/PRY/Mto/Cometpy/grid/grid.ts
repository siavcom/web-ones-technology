
//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : Grid
// Class : vi_man_cometpy                                                  
// Description : Capture Grid
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-06-29
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { GRID } from '@/classes/Grid'

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { tpy_tpy } from "./tpy_tpy"
import { des_tpy } from "./des_tpy"
import { cop_nom } from "./cop_nom"
import { con_tpy } from "./con_tpy"


import { equ_equ } from './equ_equ'
import { eco_tpy } from './eco_tpy'
import { esu_tpy } from './esu_tpy'
import { ecc_tpy } from './ecc_tpy'

import { fge_tpy } from "./fge_tpy"
import { fco_tpy } from "./fco_tpy"


export class Grid extends GRID {

  public tpy_tpy = new tpy_tpy()
  public des_tpy = new des_tpy()
  public cop_nom = new cop_nom()
  public con_tpy = new con_tpy()
  public equ_equ = new equ_equ()
  public eco_tpy = new eco_tpy()
  public esu_tpy = new esu_tpy()
  public ecc_tpy = new ecc_tpy()


  public fge_tpy = new fge_tpy()
  public fco_tpy = new fco_tpy()


  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    // this.Name = 'vi_man_cometpy                                                  '
    this.prop.Caption = ' '
    this.prop.RecordSource = 'vi_man_cometpy'
    this.prop.Visible = true
    this.prop.autoLoad = true  // carga automaticamente la tabla en el grid
  }


  public override async init(): Promise<void> {
    super.init()
    let user = "lower(SYSTEM_USER)";

    await SQLExec("select des_equ,equ_equ from vi_cap_db_equipo union \
      select ' ---------------- ' as des_equ,'   ' as equ_equ", 'vi_cap_equipo')
    this.equ_equ.prop.RowSourceType = 4;
    this.eco_tpy.prop.RowSourceType = 4;
    this.esu_tpy.prop.RowSourceType = 4;
    this.ecc_tpy.prop.RowSourceType = 4;

    /*


 if (this.Form.dialect == "postgres") user = "lower(current_user)";

 this.prop.RowSource = `select des_equ,equ_equ from vi_cap_db_equipo   \
  where ${user}='sa' or \
  (select key_pri from man_db_equusu where man_db_equusu.log_usu=${user})>0 \
  order by equ_equ`;
*/

  }
}

