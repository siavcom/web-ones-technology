//////////////////////////////////////////////
// Clase : des_prg
// Descripcion : Descripcion del programa
// @author: Fernando Cuadras Angulo
// Creacion : Junio/2022
// Ult.Mod  05/Septiembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class des_prg extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 4
        this.prop.ColumnTextLabel = 'Descripcion'
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'text'
        this.prop.ControlSource = 'vi_cap_prg.des_prg'

        //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
        this.style.width = '300px'
    }
    override async valid() {
        if (this.prop.Value.trim() == '') {
            return false
        }
        return true
    }
}