/////////////////////////////////////////////
// Clase : cam_que
// Descripcion : Campo
// @author: Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  13/Marzo/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from "@/classes/Column";

export class cam_dat extends COLUMN {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.ColumnTextLabel = "Campo";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 2; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = "camposView.ref_dat,cam_dat";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    //this.prop.ColumnWidths ="70%,10%";
    this.prop.ColumnWidths = "300px,90px";

    this.prop.Style = 2; //0=DropDown Combo 2=DropDown List
    this.style.width = "400px";
    //this.style.zIndex=2
  }
}
