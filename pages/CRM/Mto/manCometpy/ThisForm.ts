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
    this.Name = 'manCometpy'
    this.prop.textLabel = "Tipos de proyectos"
    this.prop.RecordSource=''
    this.prop.log_emp = "/logos/Logo_Empresa.png"
    this.prop.Status = 'A'
    this.style.display = "flex"
    this.style.background = "white"
    this.style.color = "#b94295"
    this.style.fontSize = "13px" 
    this.style.position = "center"
    this.style.backgroundImage = "/logos/Logo_Empresa.png"
   
  }

   

//  public async init(): Promise<void> {

//  }



} // End ThisForm
