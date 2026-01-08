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

import { alm_tda } from "./alm_tda";
import { bt_aceptar } from "./bt_aceptar";
import { Grid } from "./grid/grid";

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { captureForm } from "@/classes/CaptureForm";

export class ThisForm extends captureForm {
  ////////////////////////////////////
  // component imported
  ////////////////////////////////////

  public alm_tda = new alm_tda();
  public bt_aceptar = new bt_aceptar();
  public Grid = new Grid();

  constructor() {
    super(); // inicializa la clase base
    this.Development = false;
    this.prop.autoLoad = false;
    this.Name = "manComeisa";
    this.prop.Caption = "Insumos por almacen";
  }
} // End ThisForm
