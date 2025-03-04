//////////////////////////////////////////////
// Clase : sis_sis
// Descripcion : Sistema a cual pertenece el programa 
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  07/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class sis_sis extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.prop.ColumnTextLabel = 'Sistema '
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_prg.sis_sis'
        this.prop.ToolTipText = 'Nemonico a utilizar en el submenú'
        this.style.width = '128px'

    }
    public override async when() {
        if (this.Form.tpr_prg.prop.Value == 'S') { // Si es menu principal del sistema
            return true
        }
        this.prop.Valid = true
        return false
    }


}
