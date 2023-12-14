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

import { equ_equ } from "./equ_equ";

export class Grid extends GRID {
  public equ_equ = new equ_equ();

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    // this.Name = 'vi_cap_db_equipo                                                  '
    this.prop.textLabel = "Equipos por usuario ";
    this.prop.Visible = true;
    this.prop.ReadOnly = false;
    this.prop.autoLoad = true; // carga automaticamente la tabla en el grid
    this.style.minHeight = "300px";
  }
}
