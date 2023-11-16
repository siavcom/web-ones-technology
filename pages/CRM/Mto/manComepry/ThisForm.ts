//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : captureForm
// Class : manComepry
// Description : Capture Form 
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-07-20
// Update Date  : 
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import {tpy_tpy } from "./tpy_tpy" 
import {num_pry } from "./num_pry" 
import {equ_equ } from "./equ_equ"
import {per_pry } from "./per_pry" 
import {cop_nom } from "./cop_nom" 
import {cod_nom } from "./cod_nom" 
import {nom_nom } from "./nom_nom" 
import {con_con } from "./con_con" 
import {noc_con } from "./noc_con" 
import {fec_pry } from "./fec_pry" 
import {fcu_pry } from "./fcu_pry" 
import {ven_ven } from "./ven_ven" 
import {nom_ven } from "./nom_ven" 
import {tit_pry } from "./tit_pry" 
import {des_pry } from "./des_pry" 
import {fco_pry } from "./fco_pry" 
import {est_pry } from "./est_pry" 
import {obs_pry } from "./obs_pry" 
import {mco_pry } from "./mco_pry" 
import {mes_pry } from "./mes_pry" 
import {tap_tap} from "./tap_tap"
import {bt_actividades} from "./bt_actividades"



///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { captureForm } from '@/classes/CaptureForm'


export class ThisForm extends captureForm {

////////////////////////////////////
// component imported
////////////////////////////////////

   public tpy_tpy = new tpy_tpy() 
   public cop_nom = new cop_nom() 
   public num_pry = new num_pry() 
   public equ_equ = new equ_equ() 

   public per_pry = new per_pry() 
   public cod_nom = new cod_nom() 
   public nom_nom = new nom_nom() 
   public con_con = new con_con() 
   public noc_con = new noc_con() 

   public fec_pry = new fec_pry() 
   public fcu_pry = new fcu_pry() 
   public ven_ven = new ven_ven() 
   public nom_ven = new nom_ven() 
   public tit_pry = new tit_pry() 
   public des_pry = new des_pry() 
   public fco_pry = new fco_pry() 
   public obs_pry = new obs_pry() 
   public mco_pry = new mco_pry() 
   public est_pry = new est_pry() 
   public mes_pry = new mes_pry() 
   public bt_actividades = new bt_actividades() 

   public tap_tap = new tap_tap() // Tabla de actividates
  
  constructor() {
    super()  // inicializa la clase base

    this.Development = true
    this.prop.Name = 'manComepry'
    this.prop.textLabel = "Mantenimiento a proyectos"
    this.prop.RecordSource='vi_cap_comepry'
    this.prop.Status = 'A'
//    this.publicVar.cop_nom='C'
  }
   

  async init(){

    await this.Form.db.useNodata('vi_cap_cometap')
  //  const data=await this.Form.db.execute("select des_tpy,tpy_tpy,cop_nom from vi_cap_cometpy order by cop_nom,tpy_tpy",'cometpy') 
  //  this.Form.tpy_tpy.prop.RowSource ="cometpy.des_tpy,tpy_tpy,cop_nom"
  //  this.Form.tpy_tpy.prop.RowSourceType = 2
    await super.init() 


    this.tpy_tpy.prop.TabIndex=1 

    this.num_pry.prop.TabIndex=3
    this.equ_equ.prop.TabIndex=4
 
    this.per_pry.prop.TabIndex=5
    this.cod_nom.prop.TabIndex=6
    this.con_con.prop.TabIndex=8
    this.noc_con.prop.TabIndex=9
 
    this.fec_pry.prop.TabIndex=10
    this.fcu_pry.prop.TabIndex=11
    this.ven_ven.prop.TabIndex=12

    this.tit_pry.prop.TabIndex=14
    this.des_pry.prop.TabIndex=15
    this.fco_pry.prop.TabIndex=16
    this.obs_pry.prop.TabIndex=17
    this.mco_pry.prop.TabIndex=18
    this.est_pry.prop.TabIndex=19
    this.mes_pry.prop.TabIndex=20
    this.tap_tap.prop.TabIndex=21

    this.cop_nom.prop.TabIndex=22
    this.nom_nom.prop.TabIndex=23
    this.nom_ven.prop.TabIndex=24

  }

//  public async init(): Promise<void> {}

} // End ThisForm
