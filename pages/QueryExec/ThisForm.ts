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

import { query } from "./query"
//import {result } from "./result" 
import { BROWSE } from "@/classes/Browse"
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
  public browse = new BROWSE()
  public bt_aceptar = new bt_aceptar()


  constructor() {
    super()  // inicializa la clase base

    this.Development = false
    this.Name = 'SqlQuery'
    this.prop.textLabel = "SQL Query"
    this.prop.Status = 'A'
    this.style.display = "flex"
    this.style.background = "white"
    this.style.color = "#b94295"
    this.style.fontSize = "13px"
    this.style.position = "center"
    this.style.backgroundImage = "/logos/Logo_Empresa.png"
    //this.style.height='400px'
    //this.style.maxHeight='400px'

    // this.grid=[<<grid>>]


  }

} // End ThisForm
