//////////////////////////////////////////////
// Clase : tip_rep
// Descripcion : Si es =1 reporte detallado
// Author : Fernando Cuadras Angulo
// Creacion : 14/Sep/2023
// Ult.Mod  : 
/////////////////////////////////////////////

///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class sol_cfdi extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
        this.prop.Type = 'checkBox'
        this.prop.textLabel='Solo CFDI'
        this.prop.Value=0   
        this.prop.TabIndex=1
  }
  

 
}