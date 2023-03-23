//////////////////////////////////////////////
// Clase : vis_tab
// Descripcion : Where en la vista de mantenimiento
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  7/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class vis_tab extends COLUMN {
    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.textLabel = 'Where vista'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_tab.vis_tab'
        this.prop.ToolTipText ='Where en la vista de mantenimiento'
        this.style.width='400px'
    }
}
