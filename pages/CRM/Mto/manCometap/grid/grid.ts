//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : Grid
// Class : vi_cap_cometap
// Description : Capture Grid
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-07-10
// Update Date  :
/////////////////////////////////////////////

///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { GRID } from "@/classes/Grid";

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { tap_tap } from "./tap_tap";
import { des_tap } from "./des_tap";
//import { est_tap } from "./est_tap";
//import { eau_tap } from "./eau_tap";
//import { efi_tap } from "./efi_tap";
import { eqa_tap } from "./eqa_tap";
import { ord_tap } from "./ord_tap";
import { amu_tap } from "./amu_tap";
import { are_tap } from "./are_tap";
import { json_tap } from "./json_tap";
import { ema_tap } from "./ema_tap";
import { ems_tap } from "./ems_tap";
import { tdo_tdo } from "./tdo_tdo";

export class Grid extends GRID {
  public ord_tap = new ord_tap();
  public tap_tap = new tap_tap();
  public des_tap = new des_tap();
  public amu_tap = new amu_tap();
  //public est_tap = new est_tap();  // Estatus
  // public eau_tap = new eau_tap(); // estatus que autoriza
  // public efi_tap = new efi_tap(); // Estatus final
  public are_tap = new are_tap();
  public eqa_tap = new eqa_tap();
  public json_tap = new json_tap();
  public tdo_tdo = new tdo_tdo();
  public ema_tap = new ema_tap();
  public ems_tap = new ems_tap();

  constructor() {
    super();
    this.prop.textLabel = "Tabla de actividades";
    this.prop.Visible = true;
    this.prop.ReadOnly = false;
    this.prop.autoLoad = false; // carga automaticamente la tabla en el grid
  }
}
