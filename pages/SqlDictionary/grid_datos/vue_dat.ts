//////////////////////////////////////////////
// Clase : gru_dat
// Descripcion : Valor incial en typescript insertarse el registro nuevo en VUE 
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class vue_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.textLabel = 'Valor default Typescript'
        this.prop.Type = 'textArea'
        this.prop.ControlSource = 'vi_cap_comedat.vue_dat'
        this.prop.ToolTipText = 'Valor dafault en typescript al insertarse el registro nuevo en VUE'
        this.prop.Placeholder = "Valor default"
        this.style.width = '200px'
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    override async when() {
        this.prop.ReadOnly = !await this.Parent.cam_dat.when()
        if (!this.prop.ReadOnly && (this.Parent.def_dat.prop.Value.trim().length > 0 || this.Parent.cal_dat.prop.Value.trim().length > 0))
            this.prop.ReadOnly = true

        return !this.prop.ReadOnly
    }

    override async valid(): Promise<any> {
        if (this.prop.Value.trim() > '   ') {
            this.Parent.vue_dat.prop.Value = ''
            this.Parent.vue_dat.prop.ReadOnly = true
            this.Parent.def_dat.prop.Value = ''
            this.Parent.def_dat.prop.ReadOnly = true
        }

        await this.Parent.cal_dat.when()
        await this.Parent.def_dat.when()
        this.prop.Valid = true
        return true

    }


}
