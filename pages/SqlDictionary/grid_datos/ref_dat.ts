//////////////////////////////////////////////
// Clase : ref_dat
// Descripcion : Nombre del campo
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class ref_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.prop.ColumnTextLabel = 'Descripción'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_comedat.ref_dat'
        this.prop.ToolTipText = 'Descripción del campo'
        this.prop.Placeholder = "Descripción del campo"
        this.prop.ReadOnly = false

        //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
        this.style.width = '200px'
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    override async when() {
        this.prop.Valid = true
        this.prop.ReadOnly = false

        if (!await this.Parent.cam_dat.when()) {

            //            this.prop.ReadOnly = true
            this.prop.Valid = true
        }
        console.log('=========>3) when ref_dat ReadOnly=', this.prop.ReadOnly)
        return !this.prop.ReadOnly

    }



}
