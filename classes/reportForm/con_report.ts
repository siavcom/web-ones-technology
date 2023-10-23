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
        this.textLabel = 'Conjunto de columnas'
        this.prop.Type = 'number'
        this.prop.Decimals=0
        this.prop.ReadOnly=false
        this.prop.Value=1
        this.style.width = '50px'
        this.prop.Max= "99"
        this.prop.Min= "0"
    }
}
