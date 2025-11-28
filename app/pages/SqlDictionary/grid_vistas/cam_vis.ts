//////////////////////////////////////////////
// Clase : cam_vis
// Descripcion : Campos que contiene la vista
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  05/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class cam_vis extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.prop.ColumnTextLabel = 'SELECT <fields>'
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'textArea'
        this.prop.ControlSource = 'vi_cap_comevis.cam_vis'
        this.prop.ToolTipText = 'Campos que contiene'
        this.prop.Placeholder = "Campos que contiene"

        this.style.width = '400px'
    }


}
