//////////////////////////////////////////////
// @baseClass  : reportForm
// @class : Teams
// Description : Teams report 
// @author: El Fer Blocks (Fernando Cuadras)
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

    this.Name = 'TeamsReport'
    this.prop.textLabel = "Reporte de Teams"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_cap_teams'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'cat_teams'   // no incluir extencion jasper o jrxml

  }

} // End ThisForm
