//////////////////////////////////////////////
// Clase : ord_vis
// Descripcion : Orden de la vista remota
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  05/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class ord_vis extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.textLabel = 'Orden'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_vis.ord_vis'
        this.prop.ToolTipText ='Variables que dan el orden de la vista'
        this.prop.Placeholder = "Orden de la vista"
        this.style.width='30px'
    }
}
