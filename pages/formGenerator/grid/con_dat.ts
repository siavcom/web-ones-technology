//////////////////////////////////////////////
// Clase : con_dat
// Descripcion : Consecutivo 
// Obs: es la primer columna 
// Author : Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  22/Junio/2022
/////////////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class con_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.textLabel = 'Orden de captura'
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'number'
        this.prop.Min = '0'
        this.prop.Max = '256'
        this.prop.Decimals=1
        this.prop.ControlSource = 'vi_cap_for.con_dat'
        this.prop.Placeholder = "Orden de captura "
        this.prop.ToolTipText = 'Orden de captura'
        this.prop.ReadOnly=false
        this.style.width= '35px'
     //   this.style.flexBasis = '3px' /* width/height  - initial value: auto */
  //      this.prop.Autofocus=true
  
    }

 
}
