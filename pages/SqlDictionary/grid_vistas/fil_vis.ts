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
        this.textLabel = 'Campos que filtran la captura'
        this.prop.BaseClass = 'editText'
        
        this.prop.ControlSource = 'vi_cap_vis.fil_vis'
        this.prop.ToolTipText ='Filtro de la vista'
        this.prop.Placeholder = "Variables filtro"
        this.style.width='250px'
        
        this.prop.componentStyle.textTransform='lowercase'

    }
}
