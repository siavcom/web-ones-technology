//////////////////////////////////////////////
// Clase : sis_sis
// Descripcion : Sistema principal que contiene la tabla
// Author : Fernando Cuadras Angulo
// Creacion : 30/Junio/2023
// Ult.Mod  30/Junio/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'

export class sis_sis extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.textLabel = 'Sistema'
        this.prop.BaseClass = 'editText'
        this.prop.ToolTipText ='Nombre de la tabla'
        this.prop.ControlSource = 'vi_cap_tab.sis_sis'
        this.style.width = '50px' /* width/height  - initial value: auto */
    }

  }
