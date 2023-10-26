
//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : Grid
// Class : vi_cap_cometap
// Description : Capture Grid
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-07-10
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Clase base
///////////////////////////////////////

import {GRID} from  '@/classes/Grid'

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import {tap_tap } from "./tap_tap" 
import {des_tap } from "./des_tap" 
import {est_tap } from "./est_tap" 
import {eau_tap } from "./eau_tap" 
import {usa_tap } from "./usa_tap" 
import {ord_tap } from "./ord_tap" 
import {amu_tap } from "./amu_tap" 
import {json_tap } from "./json_tap" 
import {tdo_tdo } from "./tdo_tdo" 


export class Grid extends GRID {
 
   public tap_tap = new tap_tap() 
   public des_tap = new des_tap() 
   public est_tap = new est_tap() 
   public eau_tap = new eau_tap() 
   public usa_tap = new usa_tap() 
   public ord_tap = new ord_tap() 
   public amu_tap = new amu_tap() 
   public json_tap = new json_tap() 
   public tdo_tdo = new tdo_tdo() 
   

 
 
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    // this.Name = 'vi_cap_cometap'
    this.prop.textLabel= 'Tabla de actividades'
    this.prop.Visible= true
    this.prop.ReadOnly = false
    this.prop.autoLoad = false  // carga automaticamente la tabla en el grid
     }
 
public async  valid(){



return true
}

 }

