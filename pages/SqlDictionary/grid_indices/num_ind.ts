//////////////////////////////////////////////
// Clase : num_ind
// Descripcion : Consecutivo 
// Obs: es la primer columna 
// Author : Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  22/Junio/2022
/////////////////////////////////////////////

import { COLUMN } from '@/classes/Column'

export class num_ind extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.textLabel = 'Orden'
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'number'
        this.prop.Min = '0'
        this.prop.Max = '32'
        this.prop.Decimals=1
        this.prop.ControlSource = 'vi_cap_comeind.num_ind'
        this.prop.Placeholder = "Consecutivo/Orden "
        this.prop.ToolTipText = 'Consecutivo/Orden. El indice 1 se toma como indice principal de captura'
        this.style.width= '35px'
        //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
  //      this.prop.Autofocus=true
  
    }


}
