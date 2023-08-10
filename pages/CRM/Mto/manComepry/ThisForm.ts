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
import {per_pry } from "./per_pry" 
import {cop_nom } from "./cop_nom" 
import {cod_nom } from "./cod_nom" 
import {con_con } from "./con_con" 
import {fec_pry } from "./fec_pry" 
import {fcu_pry } from "./fcu_pry" 
import {ven_ven } from "./ven_ven" 
import {tit_pry } from "./tit_pry" 
import {des_pry } from "./des_pry" 
import {fco_pry } from "./fco_pry" 
import {est_pry } from "./est_pry" 
import {obs_pry } from "./obs_pry" 
import {mco_pry } from "./mco_pry" 



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
   public per_pry = new per_pry() 
   public cod_nom = new cod_nom() 
   public con_con = new con_con() 

   public fec_pry = new fec_pry() 
   public fcu_pry = new fcu_pry() 
   public ven_ven = new ven_ven() 
   public tit_pry = new tit_pry() 
   public des_pry = new des_pry() 
   public fco_pry = new fco_pry() 
   public est_pry = new est_pry() 
   public obs_pry = new obs_pry() 
   public mco_pry = new mco_pry() 
 
  
  constructor() {
    super()  // inicializa la clase base

    this.Development = false
    this.prop.Name = 'manComepry'
    this.prop.textLabel = "Mantenimiento a la tabla comepry"
    this.prop.RecordSource='vi_cap_comepry'
    this.prop.Status = 'A'
    //this.style.display = "flex"
    //this.style.background = "white"
    //this.style.color = "#b94295"
    //this.style.fontSize = "13px" 
    //this.style.position = "center"
  
   

  }

   

//  public async init(): Promise<void> {

//  }



} // End ThisForm
