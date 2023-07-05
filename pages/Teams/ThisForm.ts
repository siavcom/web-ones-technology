//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : captureForm
// Class : Teams
// Description : Capture Form 
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-02-17
// Update Date  : 
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import {team } from "./team" 
import {description } from "./description" 
import {sport } from "./sport" 
import {category } from "./category" 
import {manager } from "./manager" 



///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { captureForm } from '@/classes/CaptureForm'


export class THISFORM extends captureForm {

////////////////////////////////////
// component imported
////////////////////////////////////

   public team = new team() 
   public description = new description() 
   public sport = new sport() 
   public category = new category() 
   public manager = new manager() 
 
  
  constructor() {
    super()  // inicializa la clase base

    this.Development = false
    this.prop.Name = 'Teams'
    this.prop.textLabel = "Mantenimiento a la tabla Teams"
    this.prop.RecordSource='Index1_Team'
    this.prop.nem_pge = "Killo Software"
   //this.prop.fpo_pge = new Date().toISOString().substring(0, 10)
    this.prop.log_emp = "/img/Logo_Empresa.png"
    this.prop.Status = 'A'
    this.style.display = "flex"
    this.style.background = "white"
    this.style.color = "#b94295"
    this.style.fontSize = "13px" 
    this.style.position = "center"
    this.style.backgroundImage = "/img/Logo_Empresa.bmp"
   // this.grid=[<<grid>>]
   

  }
async init(){
  // <<init>>

}


} // End ThisForm
