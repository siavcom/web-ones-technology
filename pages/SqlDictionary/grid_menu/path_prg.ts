//////////////////////////////////////////////
// Clase : path_prg
// Descripcion : PATH Page 
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  :24/Julio/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class path_prg extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.prop.ColumnTextLabel = 'Path page  '
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_prg.path_prg'
        this.prop.Placeholder = "Path page"

        this.style.width = '180px'
    }
    override async valid() {

        /* if (this.prop.Value.trim() == '') {
             return false
         }
         */
        return true
    }

}
