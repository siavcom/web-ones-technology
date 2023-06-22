//////////////////////////////////////////////
// Clase : cam_dat
// Descripcion : Nombre del campo
// Author : Fernando Cuadras Angulo
// Creacion : 16/Octubre
// Ult.Mod  18/Octubre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class cam_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 2
        this.textLabel = 'Campo'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_for.cam_dat'
        this.prop.Placeholder = "Nombre del campo"
        this.prop.ToolTipText ='Nombre del campo'
        this.prop.ReadOnly= true
        //this.style.flexBasis = '10%' /* width/height  - initial value: auto */
        this.style.width='150px'
        
    }
   

}
