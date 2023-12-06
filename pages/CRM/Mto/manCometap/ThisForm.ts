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

import { tpy_tpy } from "./tpy_tpy";
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

  public tpy_tpy = new tpy_tpy();
  public bt_aceptar = new bt_aceptar();
  public Grid = new Grid();

  constructor() {
    super(); // inicializa la clase base

    this.Development = false;
    this.prop.autoLoad = false;
    this.Name = "man_cometpy";
    this.prop.textLabel = "Actividades por tipo de proyecto";
    // this.prop.RecordSource = 'man_cometpy'
    this.prop.Status = "A";
  }

  public async init() {
    await this.Form.db.execute(
      "select equ_equ,des_equ from vi_cap_db_equipo union select '          ' as equ_equ,'...Nadie' as des_equ ",
      "equipos"
    );
    console.log(
      "equipos =",
      await this.Form.db.localAlaSql("select * from Now.equipos")
    );

    await super.init();
  }
} // End ThisForm
