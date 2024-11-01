//////////////////////////////////////////////
// Clase : vue_dat
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
        this.textLabel = 'Valor default'
        this.prop.Type = 'textArea'
        this.prop.ControlSource = 'vi_cap_comedat.vue_dat'
        this.prop.ToolTipText = 'Valor dafault en typescript al insertarse el registro nuevo en VUE'
        this.prop.Placeholder = "Valor default"
        this.style.width = '200px'
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() {
        this.prop.ReadOnly = false
        if (!await this.Parent.cam_dat.when()) {
            this.prop.ReadOnly = true
            return !this.prop.ReadOnly
        }

        //   await super.when(row)
    }




}
