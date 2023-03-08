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
import {browseResult} from "./browseResult"
import { bt_aceptar } from "./bt_aceptar"

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { FORM } from '@/classes/Form'


export class THISFORM extends FORM {

////////////////////////////////////
// component imported
////////////////////////////////////

   public query = new query() 
   public browseResult = new browseResult() 
   public bt_aceptar= new bt_aceptar()
 
  
  constructor() {
    super()  // inicializa la clase base

    this.Development = false
    this.prop.Name = 'browseResult'
    this.prop.textLabel = "Query SQL"
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
