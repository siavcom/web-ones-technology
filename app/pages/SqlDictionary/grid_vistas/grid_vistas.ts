//////////////////////////////////////////////
// Clase : grid_vistas
// Descripcion : Mantenimiento de vistas remotas del diccionario de datos
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre /2022
// Ult.Mod  : 8/Septiembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { GRID } from "@/classes/Grid";

// las clases importadas son clases tipo columna, por lo que ya no se importan columnas
import { num_vis } from "./num_vis"
import { nom_vis } from "./nom_vis";
import { des_vis } from "./des_vis";
import { tab_vis } from "./tab_vis";
import { cam_vis } from "./cam_vis";
import { whe_vis } from "./whe_vis";
import { wjs_vis } from "./wjs_vis";
import { ord_vis } from "./ord_vis";
import { fil_vis } from "./fil_vis";
import { vac_vis } from "./vac_vis";

export class grid_vistas extends GRID {
  // Columna que tiene el grid
  // public con_vis = new COLUMN()
  public num_vis = new num_vis()
  public nom_vis = new nom_vis();
  public des_vis = new des_vis();
  public vac_vis = new vac_vis();
  public cam_vis = new cam_vis();
  public tab_vis = new tab_vis();
  public whe_vis = new whe_vis();
  public wjs_vis = new wjs_vis();
  public fil_vis = new fil_vis();
  public ord_vis = new ord_vis();

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.Name = "grid_vistas";
    this.prop.Caption = "Definicion de vistas de captura";
    this.prop.RecordSource = "vi_cap_comevis";
    this.prop.Visible = false;
    this.prop.ReadOnly = false;
    this.prop.autoLoad = false;
    this.prop.MaxLength = 8;
  }

}
