/////////////////////////////////////////////
// Clase : field_report
// Descripcion : Campo
// Author : Fernando Cuadras Angulo
// Creacion : Octubre/2023
// Ult.Mod  16/Octubre/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class fields_report extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.ColumnTextLabel = 'Campos'
        this.prop.Type = 'json'
        this.prop.ControlSource = 'vi_cap_db_reportfields.fields_report'
        this.style.width = '450px'
    }
}
