//////////////////////////////////////////////
// Clase : var_ord
// Descripcion : Variable de orden de la vista del reporte
// Author : Fernando Cuadras Angulo
// Creacion : 24/May/2023
// Ult.Mod  : 24/May/2023
/////////////////////////////////////////////

///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class var_ord extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.BaseClass = "comboBox";
    this.prop.textLabel = "Ordenado Por";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;

    //this.prop.ColumnWidths ="70%,10%";
    this.prop.ColumnWidths = "400px,64px";

    // this.prop.Style = 2; //0=DropDown Combo 2=DropDown List
    this.style.width = "400px";
    //this.style.zIndex=2
    // this.prop.TabIndex=103
  }
}
