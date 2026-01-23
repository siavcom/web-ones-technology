//////////////////////////////////////////////
// Clase : tip_imp
// Descripcion : Si es =1 reporte detallado
// @author: Fernando Cuadras Angulo
// Creacion : 14/Sep/2023
// Ult.Mod  :
/////////////////////////////////////////////

///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class tip_imp extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.Type = "checkBox";
    this.prop.Caption = "Reporte detallado";
    this.prop.Value = 0;
    //this.prop.TabIndex = 102;
    this.prop.Visible = false    // No muestra general o detallado
    this.prop.Disabled = true    // No muestra general o detallado

  }
}
