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
        this.textLabel = 'Valor default SQL Server'
        this.prop.Type = 'textArea'
        this.prop.ControlSource = 'vi_cap_comedat.def_dat'
        this.prop.ToolTipText = 'Valor default de la columna calculada SQL Server'
        this.style.width = '200px'
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() {
        this.prop.Valid = true
        this.prop.ReadOnly = !await this.Parent.cam_dat.when()
        if (!this.prop.ReadOnly)
            await this.valid()
        return !this.prop.ReadOnly

    }
    override async valid(): Promise<any> {
        if (this.prop.Value.trim() > '   ') {
            this.Parent.vue_dat.prop.Value = ''
            this.Parent.vue_dat.prop.ReadOnly = true
            this.Parent.cal_dat.prop.Value = ''
            this.Parent.cal_dat.prop.ReadOnly = true
            this.prop.ReadOnly = false
        } else {
            if (this.Parent.vue_dat.prop.Value.trim() > '   ' || this.Parent.cal_dat.prop.Value.trim() > '   ')
                this.prop.ReadOnly = true
            else {
                this.prop.ReadOnly = false
            }
        }

        if (this.prop.Value.trim() == '' && this.Parent.vue_dat.prop.Value.trim() == '' && this.Parent.cal_dat.prop.Value.trim() == '') {
            this.Parent.vue_dat.prop.ReadOnly = false
            this.Parent.def_dat.prop.ReadOnly = false
            this.prop.ReadOnly = false

        }
        return true
    }

}