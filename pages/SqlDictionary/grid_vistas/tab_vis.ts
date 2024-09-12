//////////////////////////////////////////////
// Clase : tab_vis
// Descripcion : relaciión de tablas que compone la vista
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  05/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class tab_vis extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.textLabel = 'FROM <Table/Join table> '
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'textArea'
        this.prop.ControlSource = 'vi_cap_comevis.tab_vis'
        this.prop.ToolTipText = 'Tablas/Join'
        this.prop.Placeholder = "Tablas"
        this.style.width = '400px'
    }


}
