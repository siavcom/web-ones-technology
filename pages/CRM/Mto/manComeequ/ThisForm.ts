//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : captureForm
// Class : manComeequ
// Description : Capture Form para equipos de trabajo
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-10-27
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
    this.Name = 'manComeequ'
    this.prop.textLabel = "Equipos de trabajo"
   
  }

   

//  public async init(): Promise<void> {

//  }



} // End ThisForm
