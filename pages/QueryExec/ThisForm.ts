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

import {query } from "./query" 
//import {result } from "./result" 
import {browse} from "@/classes/browse"
import { bt_aceptar } from "./bt_aceptar"

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { FORM } from '@/classes/Form'


export class ThisForm extends FORM {

////////////////////////////////////
// component imported
////////////////////////////////////

   public query = new query() 
   public browse = new browse() 
   public bt_aceptar= new bt_aceptar()
 
  
  constructor() {
    super()  // inicializa la clase base

    this.Development = false
    this.prop.Name = 'SqlQuery'
    this.prop.textLabel = "SQL Query"
    this.prop.Status = 'A'
    this.style.display = "flex"
    this.style.background = "white"
    this.style.color = "#b94295"
    this.style.fontSize = "13px" 
    this.style.position = "center"
    this.style.backgroundImage = "/img//Logo_Empresa.bmp"
    //this.style.height='400px'
    //this.style.maxHeight='400px'

    // this.grid=[<<grid>>]
   

  }
async init(){
  // <<init>>

}


} // End ThisForm
