/////////////////////////////////////////////
// Clase : uni_que
// Descripcion : Union logica
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  28/Abril/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class uni_que extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.textLabel = 'Union Logica'
        this.prop.BaseClass = 'comboBox'
        this.prop.ToolTipText =''
        this.prop.RowSourceType = 5  //1-Value, 2-Alias,3-sql 5-Array
        this.prop.RowSource = [
            ['Y','O',' '], 
            ['AND','OR',''] 
        ]
        //this.prop.ControlSource ='query.uni_que'
        this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;
        this.prop.ColumnWidths ="70%,10%";
        this.prop.Style = 2; //0=DropDown Combo 2=DropDown List
        this.style.width='40px'
        this.style.zIndex=2
    }

}
