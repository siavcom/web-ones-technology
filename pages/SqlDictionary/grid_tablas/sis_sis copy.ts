//////////////////////////////////////////////
// Clase : sis_sis
// Descripcion : Sistema principal que contiene la tabla
// Author : Fernando Cuadras Angulo
// Creacion : 30/Junio/2023
// Ult.Mod  30/Junio/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class sis_sis extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.prop.ColumnTextLabel = 'Sistema'
        this.prop.BaseClass = 'editText'
        this.prop.ToolTipText = 'Sistema al cual pertenece'
        this.prop.ControlSource = 'vi_cap_cometab.sis_sis'
        this.style.width = '128px' /* width/height  - initial value: auto */
    }

}
