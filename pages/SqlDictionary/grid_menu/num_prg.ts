//////////////////////////////////////////////
// Clase : num_prg
// Descripcion : Orden del programa
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  5/Octubre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class num_prg extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.prop.ColumnTextLabel = 'Orden '
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'number'
        this.prop.Decimals = 0

        this.prop.ControlSource = 'vi_cap_prg.num_prg'
        this.prop.ToolTipText = 'Orden del programa dentro del menú'
        this.prop.Placeholder = "Orden del programa"
        this.style.width = '30px'
    }


}
