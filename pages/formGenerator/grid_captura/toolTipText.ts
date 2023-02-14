//////////////////////////////////////////////
// Clase : placeHorder
// Descripcion : Tool Tip Text
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  02/Mayo /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class toolTipText extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.textLabel = 'ToolTipText'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_grd.tooltiptext'
        this.prop.ToolTipText ='valor tool tip text'
        this.style.maxWidth='150px'
       // this.style.flexBasis = '30%' /* width/height  - initial value: auto */
    }

    init() {
        this.prop.Value = this.Parent.ref_dat.prop.Value
     }
 
    ////////////////////////////////// 
    // Evento When
    ///////////////////////////////////
    async when() { 
        this.prop.ReadOnly=await !this.Parent.cam_dat.when() 
      return !this.prop.ReadOnly
         //   await super.when(row)
    }




}
