//////////////////////////////////////////////
// Clase : def_dat
// Descripcion : Valor default de la columna en  SQL Server 
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class def_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.prop.ColumnTextLabel = 'Valor default SQL-Server'
        this.prop.Type = 'textArea'
        this.prop.ControlSource = 'vi_cap_comedat.def_dat'
        this.prop.ToolTipText = 'Valor default del campo en SQL-Server'
        this.style.width = '200px'
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    override async when() {
        this.prop.Valid = true

        if (this.Parent.cal_dat.prop.Value.trim().length > 0 || this.Parent.vue_dat.prop.Value.trim().length > 0)
            this.prop.ReadOnly = true

        if (!this.prop.ReadOnly! && !await this.Parent.cam_dat.when()) {
            this.prop.ReadOnly = true
        }

        return !this.prop.ReadOnly

    }
    override async valid() {
        if (this.prop.Value.trim() > '   ') {
            this.Parent.vue_dat.prop.Value = ''
            this.Parent.vue_dat.prop.ReadOnly = true
            this.Parent.vue_dat.prop.Valid = true

            this.Parent.cal_dat.prop.Value = ''
            this.Parent.cal_dat.prop.ReadOnly = true
            this.Parent.cal_dat.prop.Valid = true
        } else {
            this.Parent.vue_dat.prop.ReadOnly = true
            this.Parent.cal_dat.prop.ReadOnly = true

        }
        return true
    }

}