//////////////////////////////////////////////
// Clase : ico_prg
// Descripcion : path del icono a aparecer
// Author : Fernando Cuadras Angulo
// Notas  : Los iconos los toma de public/Iconos
// Creacion : Mayo/2022
// Ult.Mod  07/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class ico_prg extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.prop.ColumnTextLabel = 'Icono '
        this.prop.BaseClass = 'editText'

        this.prop.ControlSource = 'vi_cap_prg.ico_prg'
        this.prop.ToolTipText = 'Icono a aparecer en el menú'
        this.style.width = '350px'
    }


}
