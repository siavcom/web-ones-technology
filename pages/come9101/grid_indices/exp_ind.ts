//////////////////////////////////////////////
// Clase : exp_ind
// Descripcion : Expresion del indicecampo
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  05/Septiembre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'


export class exp_ind extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 3
        this.textLabel = 'Expresión del indice'
        this.prop.BaseClass = 'editText'
        this.prop.ControlSource = 'vi_cap_ind.exp_ind'
        this.prop.ToolTipText ='Expresión del indice. Si es principal debe ser Variable VUE'
        this.prop.Placeholder = "Expresión del indice"

        this.style.flexBasis = '30%' /* width/height  - initial value: auto */
        this.style.width='400px'
    }

   


}
