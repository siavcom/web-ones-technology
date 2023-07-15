//////////////////////////////////////////////
// Clase : embed
// Descripcion : Despliega el reporte en PDF
// Author : Fernando Cuadras Angulo
// Creacion : 06/Junio/2023
// Ult.Mod  : 09/Junio/2023
/////////////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class displayPdf extends COMPONENT {
 
  constructor() {
    super()
        this.prop.BaseClass = 'embedpdf'
        this.prop.Visible=false
        this.style.width='100%'
   }
}