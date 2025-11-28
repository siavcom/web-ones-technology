//////////////////////////////////////////////
// Clase : des_report
// Descripcion : Descripcion
// Author : Fernando Cuadras Angulo
// Creacion : Octubre/2023
// Ult.Mod  : 20/Octubre/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class des_report extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.ColumnTextLabel = 'descripcion'
        this.prop.ControlSource = 'vi_cap_db_reportfields.des_report'
        this.style.width = '250px'

    }
}
