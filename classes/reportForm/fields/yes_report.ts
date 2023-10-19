//////////////////////////////////////////////
// Clase : yes_report
// Descripcion : Posicion
// Author : Fernando Cuadras Angulo
// Creacion : Octubre/2023
// Ult.Mod  : 16/Octubre/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class yes_report extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.textLabel = 'Posición'
        this.prop.Type = 'checbox'
        this.prop.ControlSource='vi_cap_db_reportfields.yes_report'
        this.style.width = '50px'
       
    }
}
