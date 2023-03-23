//////////////////////////////////////////////
// Clase : par_prg
// Descripcion : Parametros a pasar al correr el programa
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  07/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class par_prg extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.textLabel = 'Parametros a pasar'
        this.prop.BaseClass = 'editText'
        
        this.prop.ControlSource = 'vi_cap_prg.par_prg'
        this.prop.ToolTipText ='Parametros a pasar al correr el programa'
        this.prop.Placeholder = ""
        this.style.width='100px'
    }

}
