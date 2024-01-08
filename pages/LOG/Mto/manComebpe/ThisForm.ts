//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : captureForm
// Class : manComebpe
// Description : Capture Form
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2024-01-03
// Update Date  :
/////////////////////////////////////////////

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { des_mar } from "./des_mar";
import { des_tiu } from "./des_tiu";

import { mod_mod } from "./mod_mod";
import { pla_cam } from "./pla_cam";
import { bas_bpe } from "./bas_bpe";
import { bpe_bpe } from "./bpe_bpe";
import { tip_bpe } from "./tip_bpe";
import { cam_cam } from "./cam_cam";
import { tba_tba } from "./tba_tba";
import { pla_bpe } from "./pla_bpe";
import { cop_nom } from "./cop_nom";
import { cod_nom } from "./cod_nom";
import { nom_nom } from "./nom_nom";
import { nom_tba } from "./nom_tba";
import { tra_bpe } from "./tra_bpe";
import { cli_bpe } from "./cli_bpe";
import { cho_bpe } from "./cho_bpe";
import { pro_bpe } from "./pro_bpe";
import { tp1_bpe } from "./tp1_bpe";
import { pe1_bpe } from "./pe1_bpe";
import { tp2_bpe } from "./tp2_bpe";
import { pe2_bpe } from "./pe2_bpe";
import { obs_bpe } from "./obs_bpe";
import { bt_pesada } from "./bt_pesada";

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { captureForm } from "@/classes/CaptureForm";

export class ThisForm extends captureForm {
  ////////////////////////////////////
  // component imported
  ////////////////////////////////////

  public bas_bpe = new bas_bpe(); // Bascula
  public bpe_bpe = new bpe_bpe(); // Boleta de pesada
  public tip_bpe = new tip_bpe(); // Tipo (0=Interno, 1=Publico)

  public cam_cam = new cam_cam(); // Camion
  public des_mar = new des_mar(); // Marca
  public des_tiu = new des_tiu(); // Tipo de unidad
  public mod_mod = new mod_mod(); // Modelo
  public pla_cam = new pla_cam(); // Placas

  public pla_bpe = new pla_bpe(); // Placa del vehiculo

  public cop_nom = new cop_nom();
  public cod_nom = new cod_nom();
  public nom_nom = new nom_nom();
  public tba_tba = new tba_tba();
  public nom_tba = new nom_tba();

  public cho_bpe = new cho_bpe(); // Chofer
  public cli_bpe = new cli_bpe(); // Cliente
  public tra_bpe = new tra_bpe(); // Trasportista
  public pro_bpe = new pro_bpe(); // producto
  public tp1_bpe = new tp1_bpe(); // Fecha Hora Pesada 1
  public pe1_bpe = new pe1_bpe(); // Pesada Uno
  public tp2_bpe = new tp2_bpe(); // Fecha hora pesada 2
  public pe2_bpe = new pe2_bpe(); // Pesada Dos
  public obs_bpe = new obs_bpe(); // Observaciones
  public bt_pesada = new bt_pesada();

  constructor() {
    super(); // inicializa la clase base

    this.Development = false;
    this.Name = "manComebpe";
    this.prop.textLabel = "Pesadas en bascula";
    this.prop.RecordSource = "vi_cap_comebpe";
    this.prop.Status = "A";
    this.bt_graba.prop.Disabled = true;
  }
} // End ThisForm
