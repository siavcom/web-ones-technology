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

import { log_usu } from "./log_usu";
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

  public log_usu = new log_usu();
  public bt_aceptar = new bt_aceptar();
  public Grid = new Grid();

  constructor() {
    super(); // inicializa la clase base
    this.Development = false;
    this.prop.autoLoad = false;
    this.Name = "manEquUsu";
    this.prop.textLabel = "Equipos de trabajo por usuario";
    // this.prop.RecordSource = 'man_cometpy'
  }

  public async init() {
    await this.Form.db.execute(
      "select des_equ,equ_equ from vi_cap_db_equipo",
      "equipos"
    );
    super.init();
  }
} // End ThisForm
