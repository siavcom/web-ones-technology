//////////////////////////////////////////////
// Clase : pai_que
// Descripcion : Parentesis Izquierdo
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  13/Marzo/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class pai_que extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.textLabel = '('
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'text'
        this.prop.ReadOnly=true
//        this.prop.ControlSource = 'query.pai_que'
        this.style.width = '15px'
    }

    async click() {
        if (this.prop.Value!='(') 
             this.prop.Value='('
        else 
            this.prop.Value=' '
    }


}
