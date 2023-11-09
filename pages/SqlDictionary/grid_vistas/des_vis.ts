//////////////////////////////////////////////
// Clase : des_vis
// Descripcion : Descripcion de la vista
// Author : Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  05/Septiembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class des_vis extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 4
        this.textLabel = 'Descripcion'
        this.prop.BaseClass = 'editText'
        this.prop.Type='text'
        this.prop.ControlSource = 'vi_cap_comevis.des_vis'
        this.prop.ToolTipText ='Descripción de la vista'
        this.prop.Placeholder = "Descripción de la vista"
       
        //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
        this.style.width='200px'
    }

}
