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
//import { est_tap } from "./est_tap";
//import { eau_tap } from "./eau_tap";
//import { efi_tap } from "./efi_tap";
import { eqa_tap } from "./eqa_tap";
import { ecc_tap } from "./ecc_tap";
import { eco_tap } from "./eco_tap";
import { esu_tap } from "./esu_tap"

import { ord_tap } from "./ord_tap";
import { amu_tap } from "./amu_tap";
import { are_tap } from "./are_tap";
import { json_tap } from "./json_tap";
import { ema_tap } from "./ema_tap";
import { ems_tap } from "./ems_tap";
import { tdo_tdo } from "./tdo_tdo";
import { dec_tap } from "./dec_tap";
import { cum_tap } from "./cum_tap";
import { ume_tap } from "./ume_tap";
import { carr_mess } from "./car_mess";


export class Grid extends GRID {
  public ord_tap = new ord_tap();
  public tap_tap = new tap_tap();
  // public des_tap = new des_tap();
  public amu_tap = new amu_tap();
  //public est_tap = new est_tap();  // Estatus
  // public eau_tap = new eau_tap(); // estatus que autoriza
  // public efi_tap = new efi_tap(); // Estatus final
  public are_tap = new are_tap();
  public tdo_tdo = new tdo_tdo();
  public json_tap = new json_tap();


  public eqa_tap = new eqa_tap();
  public eco_tap = new eco_tap();
  public esu_tap = new esu_tap();
  public ecc_tap = new ecc_tap();

  public ema_tap = new ema_tap();
  public ems_tap = new ems_tap();

  public carr_mess = new carr_mess();
  public dec_tap = new dec_tap();
  public ume_tap = new ume_tap();
  public cum_tap = new cum_tap();

  constructor() {
    super();
    this.prop.Caption = "Actividades por tipo de proyecto";
    this.prop.ReadOnly = false;
    this.prop.autoLoad = false; // carga automaticamente la tabla en el grid
    this.prop.UpdateMessage = 'Grabamos tabla de actividades'
  }
}
