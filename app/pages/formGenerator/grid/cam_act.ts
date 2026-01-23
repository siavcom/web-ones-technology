//////////////////////////////////////////////
// Clase : cam_act
// Descripcion : Campo de captura actualizable
// @author: Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  05/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class cam_act extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.prop.ColumnTextLabel = 'Actua- lizable'
        this.prop.Caption = 'Si'
        this.prop.BaseClass = 'editText'
        this.prop.Type = 'checkBox'

        this.prop.ControlSource = 'vi_cap_for.cam_act'
        this.prop.ToolTipText = '[.]=Actualizable'
        this.prop.Placeholder = ""
        this.prop.Value = 1

        this.style.width = '40px'
    }

    async when() {
        if (this.Parent.updateKey.prop.Value == 1) {
            console.log('cam_act    ===>', this.Parent.updateKey.prop.Value)
            this.prop.Value = 0
            this.prop.ReadOnly = true
        } else {
            this.prop.ReadOnly = false

        }
        return !this.prop.ReadOnly

    }


}
