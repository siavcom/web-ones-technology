//////////////////////////////////////////////
// Clase : sou_dat
// Descripcion : RowSource para ComboBox
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class sou_dat extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.textLabel = 'RowSource ComboBox'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_for.sou_dat'
        this.prop.ToolTipText ='RowSource para ComboBox'
        this.prop.Placeholder = "RowSource ComboBox"
        this.style.flexBasis = '100px' /* width/height  - initial value: auto */
    }

    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() { 
        this.prop.ReadOnly=await !this.Parent.cam_dat.when() 
      return !this.prop.ReadOnly
         //   super.when(row)
    }




}
