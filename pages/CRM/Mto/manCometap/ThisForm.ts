//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : captureForm
// Class : man_cometpy
// Description : Capture Form 
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-07-10
// Update Date  : 
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { tpy_tpy } from "./tpy_tpy"
import { bt_aceptar } from "./bt_aceptar"
import { Grid } from "./grid/grid"

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { captureForm } from '@/classes/CaptureForm'


export class ThisForm extends captureForm {

  ////////////////////////////////////
  // component imported
  ////////////////////////////////////

  public tpy_tpy = new tpy_tpy()
  public bt_aceptar=new bt_aceptar()
  public Grid = new Grid()


  constructor() {
    super()  // inicializa la clase base

    this.Development = false
    this.prop.autoLoad = false
    this.Name = 'man_cometpy'
    this.prop.textLabel = "Actividades por tipo de proyecto"
    // this.prop.RecordSource = 'man_cometpy'
    this.prop.Status = 'A'
    /*
        this.style.display = "flex"
        this.style.background = "white"
        this.style.color = "#b94295"
        this.style.fontSize = "13px" 
        this.style.position = "center"
        this.style.backgroundImage = "/logos/Logo_Empresa.png"
    */


  }

  



} // End ThisForm
