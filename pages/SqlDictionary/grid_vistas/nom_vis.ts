//////////////////////////////////////////////
// Clase : nom_vis
// Descripcion : Nombre de la vista remotaindice
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  05/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class nom_vis extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.prop.ColumnTextLabel = 'Nombre'
        this.prop.BaseClass = 'editText'

        this.prop.ControlSource = 'vi_cap_comevis.nom_vis'
        this.prop.ToolTipText = 'Nombre de la vista'
        this.prop.Placeholder = "Nombre de la vista"
        this.style.width = '140px'
    }

}
