//////////////////////////////////////////////
// Clase : nullValue
// Descripcion : Permite valores nulos
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  05/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class nullValue extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.prop.ColumnTextLabel = 'Permite nulo'
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'checkBox'
        this.prop.textLabel = 'Si '

        this.prop.ControlSource = 'vi_cap_for.nullvalue'
        this.prop.ToolTipText = '[.]=Permite valores nulos'
        this.prop.Placeholder = ""
        this.prop.Value = 0

        this.style.width = '40px'

    }


}
