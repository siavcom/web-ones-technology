
//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : Grid
// Class : vi_cap_cometpy                                                  
// Description : Capture Grid
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-06-29
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Clase base
///////////////////////////////////////

import {GRID} from  '@/classes/Grid'

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import {tpy_tpy } from "./tpy_tpy" 
import {des_tpy } from "./des_tpy" 
import {cop_nom } from "./cop_nom" 
import {con_tpy } from "./con_tpy" 
import {fge_tpy } from "./fge_tpy" 
import {fco_tpy } from "./fco_tpy" 


export class Grid extends GRID {
 
   public tpy_tpy = new tpy_tpy() 
   public des_tpy = new des_tpy() 
   public cop_nom = new cop_nom() 
   public con_tpy = new con_tpy() 
   public fge_tpy = new fge_tpy() 
   public fco_tpy = new fco_tpy() 
 
 
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    // this.prop.Name = 'vi_cap_cometpy                                                  '
    this.prop.textLabel= ' '
    this.prop.RecordSource='vi_cap_cometpy'
    this.prop.Visible= true
    this.prop.ReadOnly = false
    this.prop.autoLoad = true  // carga automaticamente la tabla en el grid
     }
 
 }

