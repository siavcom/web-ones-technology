//////////////////////////////////////////////
// Clase : embed
// Descripcion : Despliega el reporte en PDF
// @author: Fernando Cuadras Angulo
// Creacion : 06/Junio/2023
// Ult.Mod  : 09/Junio/2023
/////////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class displayPdf extends COMPONENT {
  constructor() {
    super();
    this.prop.BaseClass = "embedPdf";
    this.prop.Visible = false;
    this.style.height = "auto";
    this.style.width = "100%"; //1100px
    this.style.minWidth = "1200px";
  }
}
