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
    this.prop.Caption = "Equipos al cual pertenece "
    this.prop.Visible = true;
    this.prop.ReadOnly = false;
    this.prop.autoLoad = false; // carga automaticamente la tabla en el grid
    this.style.minHeight = "300px";
    this.style.width = "600px";
    this.prop.UpdateMessage = "Grabamos Equipo";
    this.prop.DeleteMessage = "Borramos Equipo";
  }
  public override async appendRow(): Promise<void> {
    this.prop.Disabled = true;

    const m = { log_usu: this.Form.log_usu.prop.Value };
    await appendBlank(this.prop.RecordSource, m); //Incertamos un renglon en blanco
    this.prop.Disabled = false;

    this.Row = -10; // Ponemos en -10 para refrescar la pagina con el renglon insertado
  }


}
