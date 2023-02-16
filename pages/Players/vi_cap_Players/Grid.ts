
//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : Grid
// Class : vi_cap_Players
// Description : Capture Grid
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-02-16
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Clase base
///////////////////////////////////////

import {GRID} from  '@/classes/Grid'

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import {player } from "./player" 
import {name } from "./name" 
import {position } from "./position" 
import {nickname } from "./nickname" 


export class grid extends GRID {
 
   public player = new player() 
   public name = new name() 
   public position = new position() 
   public nickname = new nickname() 
 
 
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    //this.prop.Name = 'vi_cap_Players'
    this.prop.textLabel= 'Mantenimiento a la tabla vi_cap_Players'
    this.prop.RecordSource='vi_cap_Players'
    this.prop.Visible= false
    this.prop.ReadOnly = false;
    this.prop.ColumnCount=4
     }

  
}
