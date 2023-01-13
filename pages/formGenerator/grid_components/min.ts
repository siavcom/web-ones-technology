//////////////////////////////////////////////
// Clase : min
// Descripcion : Valor minimo
// Author : Fernando Cuadras Angulo
// Creacion : 16/Octubre/2022
// Ult.Mod  : 18/Octubre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase baseº
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class min extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.textLabel = 'Valor minimo'
        this.prop.BaseClass = 'editText'
        this.prop.Type ='number'
        this.prop.ControlSource = 'vi_cap_for.min'
        this.prop.ToolTipText ='Valor minimo del campo'
        this.prop.Placeholder = "Valor minimo del campo"
        this.prop.Value = 0

        //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
        this.style.width='40px'
    }
    async  when() {
        if (this.Parent.tip_dat.prop!='N') 
            this.prop.ReadOnly=true
        return !this.prop.ReadOnly

    }
 
}
