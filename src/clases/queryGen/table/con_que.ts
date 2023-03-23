/////////////////////////////////////////////
// Clase : con_que
// Descripcion : Condicion
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  13/Marzo/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class con_que extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.textLabel = 'Condicion'
        this.prop.BaseClass = 'comboBox'
        this.prop.ToolTipText =''
        this.prop.RowSourceType = 5  //1-Value, 2-Alias,3-sql 5-Array
        this.prop.RowSource = [
            ['MAYOR QUE','MENOR QUE','MAYOR O IGUAL QUE','MENOR O IGUAL QUE','IGUAL QUE','ESTE EN','NO ESTE EN','ENTRE', 'CONTIENE','DIFERENTE QUE','NO CONTIENE'], 
            ['>',         '<',       '>='                ,'<='              ,'='        ,'IN',    ,'NOT IN'    ,'BETWEN','CHARINDEX','<>'          ,'NOCHAR'] 
        ]
        this.prop.ControlSource ='query.con_que'
        this.prop.ColumnCount = 2;
        this.prop.BoundColumn = 2;
        this.prop.ColumnWidths ="70%,10%";
        this.prop.Visible = false;
        this.prop.MultiSelect= false;
        this.prop.List= [],
        this.prop.Style = 2; //0=DropDown Combo 2=DropDown List
        this.style.width='200px'
        this.style.zIndex=2
    }
   
}
