//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// BaseClass : Grid
// Class : vi_cap_db_equipo
// Description : Capture Grid
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-06-29
// Update Date  :
/////////////////////////////////////////////

///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { GRID } from "@/classes/Grid";

/////////////////////////////////////////
// Component import
//////////////////////////////////////

import { cla_isu } from "./cla_isu";
import { num_fam } from "./num_fam";
import { cla_fam } from "./cla_fam";
import { des_isu } from "./des_isu";

export class Grid extends GRID {
  public num_fam = new num_fam();
  public cla_fam = new cla_fam();
  public cla_isu = new cla_isu();
  public des_isu = new des_isu();

  constructor() {
    super();
    // this.Name = 'vi_cap_db_equipo                                                  '
    this.prop.textLabel = "Insumo o familias que se permiten por almacen";
    this.prop.Visible = true;
    this.prop.autoLoad = true; // carga automaticamente la tabla en el grid
  }
  /*
  public async appendRow() {

   const m={ alm_tda: this.Form.alm_tda.prop.Value}
   super.appendRow(m)
  }
*/
}
