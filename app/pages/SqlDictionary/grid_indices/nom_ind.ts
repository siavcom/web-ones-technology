//////////////////////////////////////////////
// Clase : nom_ind
// Descripcion : Nombre del indice
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  05/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class nom_ind extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.prop.ColumnTextLabel = 'Nombre del indice'
        this.prop.BaseClass = 'editText'
        this.inputStyle.textTransform = 'lowercase'
        this.prop.ControlSource = 'vi_cap_comeind.nom_ind'
        this.prop.ToolTipText = 'Nombre del indice'
        this.prop.Placeholder = "Nombre del indice"
        this.style.width = '150px'
        this.prop.ErrorMessage = 'Nombre inválido'

    }

    override async valid() {
        if (this.prop.Value.trim().length == 0) return false;

        this.prop.Value = this.prop.Value.toLowerCase()

        return await super.valid();
    }


}
