//////////////////////////////////////////////
// Clase : embed
// Descripcion : Despliega el reporte en PDF
// Author : Fernando Cuadras Angulo
// Creacion : 06/Junio/2023
// Ult.Mod  : 09/Junio/2023
/////////////////////////////////////////////

import { BROWSE } from "@/classes/Browse"

export class displayBrowse extends BROWSE {
  constructor() {
    super();
    this.prop.Visible = false;

  }
}