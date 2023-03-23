//////////////////////////////////////////////
// Clase : ref_dat
// Descripcion : Descripcion del campo
// Author : Fernando Cuadras Angulo
// Creacion : 16/Octubre/2022
// Ult.Mod  : 22/Octubre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class ref_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.textLabel = 'textLabel'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_for.ref_dat'
        this.prop.ReadOnly=false
        //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
        this.style.width='300px'
    }
}
