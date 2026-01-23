//////////////////////////////////////////////
// Clase : updateKey
// Descripcion : Es llave de actualizacion
// @author: Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  05/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class updateKey extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.prop.ColumnTextLabel = 'Indice de actualización'
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'checkBox'
        this.prop.Caption = 'Si'

        this.prop.ControlSource = 'vi_cap_for.updatekey'
        this.prop.Value = 1

        this.style.width = '40px'

    }

    async valid() {
        if (+this.prop.Value == 1) // Si es llave de actualizacion es actaulizable
            this.Parent.cam_act.prop.Value = 1
        return true

    }


}
