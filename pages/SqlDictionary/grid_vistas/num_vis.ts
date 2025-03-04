//////////////////////////////////////////////
// Clase : num_vis
// Descripcion : Número de de vista (orden al momento de creacion)
// Author : Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  22/Junio/2022
/////////////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class num_vis extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.prop.ColumnTextLabel = 'Numero'
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'number'
        this.prop.Min = '0'
        this.prop.Max = '32'
        this.prop.Decimals = 0
        this.prop.ControlSource = 'vi_cap_comevis.num_vis'
        this.prop.Placeholder = "Numero"
        this.style.width = '35px'
        //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
        //      this.prop.Autofocus=true

    }


}
