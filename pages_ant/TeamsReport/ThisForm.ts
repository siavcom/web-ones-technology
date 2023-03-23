//////////////////////////////////////////////
// BaseClass : reportForm
// Class : Teams
// Description : Teams report 
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-03-17
// Update Date  : 
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

//import {team } from "./team" 

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportForm } from '@/classes/reportForm/reportForm'
export class THISFORM extends reportForm {

////////////////////////////////////
// component imported
////////////////////////////////////

   //public team = new team() 
   
 
  
  constructor() {
    super()  // inicializa la clase base
 
    this.prop.Name = 'TeamsReport'
    this.prop.textLabel = "Reporte de Teams"
    this.prop.Status = 'A'
   // this.grid=[<<grid>>]
   

  }
async init(){
  // <<init>>

}


} // End ThisForm
