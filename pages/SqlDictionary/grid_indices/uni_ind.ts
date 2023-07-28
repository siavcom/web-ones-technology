//////////////////////////////////////////////
// Clase : uni_ind
// Descripcion : Indice Unico
// Obs: 
// Author : Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  23/Enero/2023
/////////////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class uni_ind extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.textLabel = 'Indice unico'
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'number'
        this.prop.Min = '0'
        this.prop.Max = '1'
        this.prop.Decimals=0
        this.prop.ControlSource = 'vi_cap_ind.uni_ind'
        this.prop.Placeholder = "1=SI, 0=No "
        this.prop.ToolTipText = 'Consecutivo/Orden'
        this.style.width= '20px'
        //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
  //      this.prop.Autofocus=true
 
    }
}
