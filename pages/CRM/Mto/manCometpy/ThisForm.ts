//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : captureForm
// Class : manCometpy
// Description : Capture Form 
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-06-29
// Update Date  : 
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import {Grid} from "./grid/grid" 



///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { captureForm } from '@/classes/CaptureForm'


export class ThisForm extends captureForm {

////////////////////////////////////
// component imported
////////////////////////////////////

   public Grid = new Grid() 
 
  
  constructor() {
    super()  // inicializa la clase base

    this.Development = false
    this.prop.Name = 'manCometpy'
    this.prop.textLabel = "Definicion de proyectos"
    this.prop.RecordSource=''
    this.prop.nem_pge = "Killo Software"
   //this.prop.fpo_pge = new Date().toISOString().substring(0, 10)
    this.prop.log_emp = "/img//Logo_Empresa.bmp"
    this.prop.Status = 'A'
    this.style.display = "flex"
    this.style.background = "white"
    this.style.color = "#b94295"
    this.style.fontSize = "13px" 
    this.style.position = "center"
    this.style.backgroundImage = "/img//Logo_Empresa.bmp"
   
  }

   

//  public async init(): Promise<void> {

//  }



} // End ThisForm
