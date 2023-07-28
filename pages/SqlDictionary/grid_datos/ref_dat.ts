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
        this.textLabel = 'Descripción'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_dat.ref_dat'
        this.prop.ToolTipText ='Descripción del campo'
        this.prop.Placeholder = "Descripción del campo"

        //this.style.flexBasis = '30%' /* width/height  - initial value: auto */
        this.style.width='200px'
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() { 
        await this.Parent.cam_dat.when()
        this.prop.ReadOnly = await this.Parent.cam_dat.prop.ReadOnly
        return !this.prop.ReadOnly

    }



}
