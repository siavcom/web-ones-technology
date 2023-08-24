//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : captureForm
// Class : Players
// Description : Capture Form 
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-02-20
// Update Date  : 
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import {team } from "./team" 
import {player } from "./player" 
import {name } from "./name" 
import {nickname } from "./nickname" 
import {jerseyno } from "./jerseyno" 
import {positionname } from "./positionname" 
import {birthday } from "./birthday" 



///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { captureForm } from '@/classes/CaptureForm'


export class ThisForm extends captureForm {

////////////////////////////////////
// component imported
////////////////////////////////////

   public team = new team() 
   public player = new player() 
   public name = new name() 
   public nickname = new nickname() 
   public jerseyno = new jerseyno() 
   public positionname = new positionname() 
   public birthday = new birthday() 
 
  
  constructor() {
    super()  // inicializa la clase base

    this.Development = false
    this.Name = 'Players'
    this.prop.textLabel = "Mantenimiento a la tabla Players"
    this.prop.RecordSource='Index1_Players'
    this.prop.nem_pge = "Killo Software"
    //this.prop.fpo_pge = new Date().toISOString().substring(0, 10)
    this.prop.log_emp = "/logos/Logo_Empresa.png"
    this.prop.Status = 'A'
    this.style.display = "flex"
    this.style.background = "white"
    this.style.color = "#b94295"
    this.style.fontSize = "13px" 
    this.style.position = "center"
    this.style.backgroundImage = "/logos/Logo_Empresa.png"
    this.grid=['']
   

  }
async init(){
   

}


} // End ThisForm
