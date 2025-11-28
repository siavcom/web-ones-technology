//////////////////////////////////////////////
// Clase : val_que
// Descripcion : valor
// Author : Fernando Cuadras Angulo
// Creacion : Marzo/2023
// Ult.Mod  13/Marzo/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class val_que extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.ColumnTextLabel = 'Valor'
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'text'
        //       this.prop.ControlSource = 'query.val_que'
        this.style.width = '200px'
    }

    override async valid(): Promise<any> {
        if (this.prop.Value.trim() == '')
            return false

        this.Parent.pad_que.prop.Valid = true
        this.Parent.pai_que.prop.Valid = true
        this.Parent.uni_que.prop.Valid = true
        return true

    }



}
