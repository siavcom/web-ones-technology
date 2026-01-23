//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// @baseClass  : captureForm
// @class : man_cometpy
// Description : Capture Form
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { log_usu } from "./log_usu";
import { bt_aceptar } from "./bt_aceptar";
import { Grid } from "./grid/grid";

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { FORM } from "@/classes/Form";

export class ThisForm extends FORM {
  ////////////////////////////////////
  // component imported
  ////////////////////////////////////

  public log_usu = new log_usu();
  public bt_aceptar = new bt_aceptar();
  public Grid = new Grid();

  constructor() {
    super(); // inicializa la clase base
    this.Development = false;
    this.prop.autoLoad = false;
    this.Name = "manEquUsu";
    this.prop.Caption = "Equipos de trabajo por usuario";
    this.mainStyle.display = 'inherit'
    // this.prop.RecordSource = 'man_cometpy'
  }

  public async init() {
    await SQLExec(
      "select des_equ,equ_equ from vi_cap_db_equipo",
      "equipos"
    );
    super.init();
  }
} // End ThisForm
