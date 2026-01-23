//////////////////////////////////////////////
// Clase : lon_dat
// Descripcion : Longitud del dato
// @author: Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  22/Junio/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class lon_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 4
        this.prop.ColumnTextLabel = 'Lon- gitud'
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'number'
        this.prop.Decimals = 0
        this.prop.ControlSource = 'vi_cap_for.lon_dat'
        this.prop.ToolTipText = 'Logitud'
        this.prop.Placeholder = "Longitud"
        this.prop.ReadOnly = true


        //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
        this.style.width = '48px'
    }


}
