//////////////////////////////////////////////
// Clase : fil_vis
// Descripcion : Orden de la vista remota
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  05/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class fil_vis extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.textLabel = 'Filtro'
        this.prop.BaseClass = 'editText'
        
        this.prop.ControlSource = 'vi_cap_vis.fil_vis'
        this.prop.ToolTipText ='Variables m que filtran la vista'
        this.prop.Placeholder = "Variable m"
        this.style.width='120px'
    }


}
