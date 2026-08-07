
//////////////////////////////////////////////
// Clase : Celda de un gridd
// @author: Fernando Cuadras Angulo
// Creacion : Noviembre/2021
// Ult.Mod  : Agosto/2025
/////////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class COLUMNFILTER extends COMPONENT {
  //  constructor(parent: Record<string, never>) {

  constructor() {
    super();
    this.prop.Capture = false;
    this.prop.FieldFilter = '' // controlSource del filtro (tabla.field)
    this.prop.FilterOperator = 'AND';
  }
}
