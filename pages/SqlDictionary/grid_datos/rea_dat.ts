//////////////////////////////////////////////
// Clase : rea_dat
// Descripcion : Es de lectura el campo 
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class rea_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.prop.ColumnTextLabel = 'Lectura'
        this.prop.Caption = 'Si'
        this.prop.Type = 'checkBox'
        this.prop.ControlSource = 'vi_cap_comedat.rea_dat'
        this.prop.ToolTipText = '1=Permite lectura'
        this.style.width = '100px'

    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() {
        this.prop.Valid = true
        if (!await this.Parent.cam_dat.when()) {
            this.prop.ReadOnly = true
            this.prop.Valid = true
        }
        return !this.prop.ReadOnly
    }




}
