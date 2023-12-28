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

export class Grid extends GRID {
  public cla_isu = new cla_isu();
  constructor() {
    super();
    // this.Name = 'vi_cap_db_equipo                                                  '
    this.prop.textLabel = "Insumo";
    this.prop.Visible = true;
    this.prop.ReadOnly = false;
    this.prop.autoLoad = true; // carga automaticamente la tabla en el grid

    this.style.width = "300px";
  }
}
