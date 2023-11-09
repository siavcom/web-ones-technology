//////////////////////////////////////////////
// Clase : wjs_vis
// Descripcion : Condicion SQL de la vista
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  05/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class wjs_vis extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.textLabel = 'Where SQL '
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'textArea'
        this.prop.ControlSource = 'vi_cap_comevis.wjs_vis'
        this.prop.ToolTipText ='Where SQL con macro sustitucion para TypeScript'
        this.prop.Placeholder = "Where SQL"

        this.style.width='300px'
    }


}
