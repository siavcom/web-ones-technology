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
import {equ_usu } from "./equ_usu"
import {per_pry } from "./per_pry" 
import {des_cop } from "./des_cop" 
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



///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { captureForm } from '@/classes/CaptureForm'


export class ThisForm extends captureForm {

////////////////////////////////////
// component imported
////////////////////////////////////

   public tpy_tpy = new tpy_tpy() 
   public des_cop = new des_cop() 
   public num_pry = new num_pry() 
   public equ_usu = new equ_usu() 

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
   public tap_tap = new tap_tap() // Tabla de actividates
  
  constructor() {
    super()  // inicializa la clase base

    this.Development = true
    this.prop.Name = 'manComepry'
    this.prop.textLabel = "Mantenimiento a proyectos"
    this.prop.RecordSource='vi_cap_comepry'
    this.prop.Status = 'A'
    this.publicVar.cop_nom='C'
  }
   

  async init(){
  //  const data=await this.Form.db.execute("select des_tpy,tpy_tpy,cop_nom from vi_cap_cometpy order by cop_nom,tpy_tpy",'cometpy') 
  //  this.Form.tpy_tpy.prop.RowSource ="cometpy.des_tpy,tpy_tpy,cop_nom"
  //  this.Form.tpy_tpy.prop.RowSourceType = 2
  
    this.Form.db.useNodata('vi_cap_cometap')
  }

//  public async init(): Promise<void> {}

} // End ThisForm
