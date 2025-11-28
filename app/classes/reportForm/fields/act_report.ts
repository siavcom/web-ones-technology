//////////////////////////////////////////////
// Clase : act_report
// Descripcion : Actualizable
// Author : Fernando Cuadras Angulo
// Creacion : Octubre/2023
// Ult.Mod  : 23/Octubre/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class act_report extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.ColumnTextLabel = 'Actualizable'
        this.prop.Type = 'checBox'
        this.prop.ControlSource = 'vi_cap_db_reportfields.act_report'
        this.style.width = '50px'

    }
}
