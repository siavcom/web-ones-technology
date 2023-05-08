/////////////////////////////////////////////
// Clase : cam_que
// Descripcion : Campo
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  13/Marzo/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class cam_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.textLabel = 'Campo'
        this.prop.BaseClass = 'comboBox'
        this.prop.RowSourceType = 2  //1-Value, 2-Alias,3-sql 5-Array
        this.prop.RowSource = "campos.ref_dat,cam_dat"
        this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;
        //this.prop.ColumnWidths ="70%,10%";
        this.prop.ColumnWidths ="200px,64px";

        this.prop.Style = 2; //0=DropDown Combo 2=DropDown List
        this.style.width='200px'
        this.style.zIndex=2
    }

}