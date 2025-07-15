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
        this.prop.ColumnTextLabel = 'Valor calculado in SQL Server'
        this.prop.Type = 'textArea'
        this.prop.ControlSource = 'vi_cap_comedat.cal_dat'
        this.prop.ToolTipText = 'Valor calculado al insertar el registro en SQL Server'
        this.style.width = '200px'
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() {
        this.prop.Valid = true

        if (this.Parent.def_dat.prop.Value.trim().length > 0 || this.Parent.vue_dat.prop.Value.trim().length > 0)
            this.prop.ReadOnly = true

        if (!this.prop.ReadOnly! && !await this.Parent.cam_dat.when()) {
            this.prop.ReadOnly = true
            this.prop.Valid = true
        }


        /*
        const Value = this.Parent.cam_dat.prop.Value.trim().toUpperCase();
        if (
            Value == "USU_USU" ||
            Value == "USU_CRE" ||
            Value == "TIE_UAC" ||
            Value == "TIE_CRE" ||
            Value == "TIMESTAMP" ||
            Value == "KEY_PRI"
        )
            this.prop.ReadOnly = true;
*/


        return !this.prop.ReadOnly

    }
    override async valid(): Promise<any> {
        if (this.prop.Value.trim() > '   ') {
            this.Parent.vue_dat.prop.Valid = true
            this.Parent.vue_dat.prop.Value = ''
            this.Parent.vue_dat.prop.ReadOnly = true

            this.Parent.def_dat.prop.Valid = true
            this.Parent.def_dat.prop.Value = ''
            this.Parent.def_dat.prop.ReadOnly = true
        } else {
            this.Parent.vue_dat.prop.ReadOnly = false
            this.Parent.def_dat.prop.ReadOnly = false
        }

        return true
    }
}