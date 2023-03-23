//////////////////////////////////////////////
// Clase : ren_que
// Descripcion : Renglon
// Author : Fernando Cuadras Angulo
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
        this.prop.Order = 1
        this.textLabel = 'Renglon'
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'numeric'
        this.prop.ReadOnly = true
        this.prop.ControlSource = 'query.recno'
//        this.style.width = '15px'
    }

}
