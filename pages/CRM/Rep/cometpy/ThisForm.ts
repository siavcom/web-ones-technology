//////////////////////////////////////////////
// BaseClass : reportForm
// Class : Teams
// Description : Teams report 
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-03-17
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportForm } from '@/classes/reportForm/reportForm'

export class ThisForm extends reportForm {
  
  constructor() {
    super()  // inicializa la clase base
    this.prop.Name = 'TiposProyectos'
    this.prop.textLabel = "Reporte  de tipos de proyecto"
    this.prop.Status = 'A'
    this.prop.Development=true
    this.vis_rep = 'vi_rep_cometpy'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value ='TiposProyectos'   // no incluir extencion jasper o jrxml
    this.for_imp.prop.Value ='rep_cometpy'   // no incluir extencion jasper o jrxml
  }

} // End ThisForm
