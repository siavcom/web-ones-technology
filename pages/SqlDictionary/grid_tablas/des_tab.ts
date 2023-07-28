//////////////////////////////////////////////
// Clase : des_tab
// Descripcion : Descripcion de la tabla
// Author : Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  07/Septiembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class des_tab extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 2
        this.textLabel = 'Descripcion'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_tab.des_tab'
        this.prop.ToolTipText ='Descripción de la tabla'
        this.style.width='600px'
    }

}
