//////////////////////////////////////////////
// Clase : controlSource
// Descripcion : Control Source
// Author : Fernando Cuadras Angulo
// Creacion : 16/Octubre/2022
// Ult.Mod  18/Octubre/20222
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class controlSource extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.textLabel = 'Control Source'
        this.prop.BaseClass = 'editText'
        this.prop.Type ='text'
        this.prop.ControlSource = 'vi_cap_grd.controlsource'
        this.prop.ToolTipText ='Control Source'
        this.prop.Placeholder = "table.field"
        this.style.width='250px'
    }

async init(){
    this.prop.Value =this.Form.nom_tab.prop.Value+'.'+this.Parent.prop.Value
    console.log('Init Control source ',this.prop.Value)
}

}
