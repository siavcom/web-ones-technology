//////////////////////////////////////////////
// Clase : ren_que
// Descripcion : Renglon
// @author: Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  : 13/Marzo/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class ren_que extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.ColumnTextLabel = 'Ren'
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'number'
        this.prop.ReadOnly = true
        this.prop.Decimals = 0
        this.style.width = '25px'

    }
}
