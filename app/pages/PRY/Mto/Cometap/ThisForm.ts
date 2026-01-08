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


export class ThisForm extends FORM {
  ////////////////////////////////////
  // component imported
  ////////////////////////////////////

  public tpy_tpy = new tpy_tpy();
  public bt_aceptar = new bt_aceptar();
  public Grid = new Grid();
  public cop_nom = "N";

  constructor() {
    super(); // inicializa la clase base

    this.Development = false;
    this.prop.autoLoad = false;
    this.Name = "man_cometpy";
    this.prop.Caption = "Actividades por tipo de proyecto";
    // this.prop.RecordSource = 'man_cometpy'
    this.prop.Status = "A";
  }

  public async init() {
    await SQLExec(
      "select equ_equ,des_equ from vi_cap_db_equipo union select '          ' as equ_equ,'...Nadie' as des_equ ",
      "equipos"
    );

    await SQLExec('select * from vi_cap_cometac', 'actividades');
    this.Grid.tap_tap.prop.RowSourceType = 4;
    this.Grid.tap_tap.prop.RowSource =
      "select des_tap,tap_tap from now.actividades order by des_tap";


    await super.init();
  }
} // End ThisForm
