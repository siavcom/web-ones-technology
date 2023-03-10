//////////////////////////////////////////////
// Clase : nom_ind
// Descripcion : Nombre del indice
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  05/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class nom_ind extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.textLabel = 'Nombre'
        this.prop.BaseClass = 'editText'
        
        this.prop.ControlSource = 'vi_cap_ind.nom_ind'
        this.prop.ToolTipText ='Nombre del indice'
        this.prop.Placeholder = "Nombre del indice"
        this.style.width='150px'

    }


}
