//////////////////////////////////////////////
// Clase : con_report
// Descripcion : Conjunto de columnas
// Author : Fernando Cuadras Angulo
// Creacion : Octubre/2023
// Ult.Mod  : 16/Octubre/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class con_report extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.ColumnTextLabel = 'Conjunto'
        this.prop.Type = 'number'
        this.prop.ControlSource = 'vi_cap_db_reportfields.con_report'
        this.prop.Decimals = 0
        this.prop.ReadOnly = false
        this.style.width = '50px'

    }
}
