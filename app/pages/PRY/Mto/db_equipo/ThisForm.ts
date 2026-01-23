//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// @baseClass  : captureForm
// @class : manComeequ
// Description : Capture Form para equipos de trabajo
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2023-10-27
// Update Date  :
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { Grid } from "./grid/grid";

///////////////////////////////////////
// Base class
///////////////////////////////////////



export class ThisForm extends FORM {
  ////////////////////////////////////
  // component imported
  ////////////////////////////////////

  public Grid = new Grid();

  constructor() {
    super(); // inicializa la clase base

    this.Development = false;
    this.Name = "manComeequ";
    this.prop.Caption = "Equipos de trabajo";
  }
  /*
  async init() {
    this.Grid.prop.RecordSource = "";
    await  use("vi_cap_db_equipo");
    this.Grid.prop.RecordSource = "vi_cap_db_equipo";
  }
  */
} // End ThisForm
