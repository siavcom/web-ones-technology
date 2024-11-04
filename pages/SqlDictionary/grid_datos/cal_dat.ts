//////////////////////////////////////////////
// Clase : cal_dat
// Descripcion : Valor columna calculada SQL Server 
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class cal_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.textLabel = 'Columna calculada SQL Server'
        this.prop.Type = 'textArea'
        this.prop.ControlSource = 'vi_cap_comedat.cal_dat'
        this.prop.ToolTipText = 'Columna calculada al insertarse el registro nuevo en SQL'
        this.style.width = '200px'
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() {
        this.prop.Valid = true
        this.prop.ReadOnly = false
        if (!await this.Parent.cam_dat.when()) {
            this.prop.ReadOnly = true
            return !this.prop.ReadOnly
        }
        await this.valid()
    }
    override async valid(): Promise<any> {
        if (this.prop.Value.trim() > '   ') {
            this.Parent.vue_dat.prop.Value = ''
            this.Parent.vue_dat.prop.ReadOnly = true
            this.Parent.def_dat.prop.Value = ''
            this.Parent.def_dat.prop.ReadOnly = true
        } else {

            if (this.Parent.vue_dat.prop.Value.trim() > '   ' || this.Parent.def_dat.prop.Value.trim() > '   ')
                this.prop.ReadOnly = true


            else {
                this.prop.ReadOnly = false
            }
        }

        if (this.prop.Value.trim() == '' && this.Parent.vue_dat.prop.Value.trim() == '' && this.Parent.def_dat.prop.Value.trim() == '') {
            this.Parent.vue_dat.prop.ReadOnly = false
            this.Parent.def_dat.prop.ReadOnly = false
            this.prop.ReadOnly = false
        }

        return true
    }
}