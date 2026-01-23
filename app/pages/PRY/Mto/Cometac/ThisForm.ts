//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// @baseClass  : captureForm
// @class : manCometac
// Description : Capture Form 
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2023-06-29
// Update Date  : 
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { Grid } from "./grid/grid"



///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { captureForm } from '@/classes/CaptureForm'


export class ThisForm extends FORM {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////

  public Grid = new Grid()


  constructor() {
    super()  // inicializa la clase base

    this.Development = false
    this.Name = 'manCometac'
    this.prop.Caption = "Tabla de actividades"
    this.prop.RecordSource = ''

    this.prop.Status = 'A'
    /*
        this.style.display = "flex"
        this.style.background = "white"
        this.style.color = "#b94295"
        this.style.fontSize = "13px"
        this.style.position = "center"
    */
  }





} // End ThisForm
