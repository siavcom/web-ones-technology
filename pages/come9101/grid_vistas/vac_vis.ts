//////////////////////////////////////////////
// Clase : vac_vis
// Descripcion : Vista remota de actualizaciònOrden de la vista remota
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  03/Octubre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COLUMN } from '@/classes/Column'
////import { MessageBox } from '@/classes/Functions'


export class vac_vis extends COLUMN {

    //  constructor(parent: Record<string, never>) {
    constructor() {
        super()
        this.prop.Order = 1
        this.textLabel = 'Vista act. remota SQL'
        this.prop.BaseClass = 'editText'
        
        this.prop.ControlSource = 'vi_cap_vis.vac_vis'
        this.prop.ToolTipText ='Vista remota SQL de actualización'
        this.prop.Placeholder = "vista remota SQL"
        this.style.width='120px'
    }

Valid(){
  if (this.prop.Value.trim()<'') {
    MessageBox('No hay vista remota de actualización')
  }

}


}
