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
    this.tab_ord='comepry' // Tabla de donde tomara los campos para el orden de la vista
    this.prop.Name = 'comepry'
    this.prop.textLabel = "Proyectos"
    this.prop.Status = 'A'
    this.prop.Development=true
    this.vis_rep = 'vi_rep_comepry'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value ='rep_comepry'   // no incluir extencion jasper o jrxml
  }
  public async init(){
    await super.init()
    this.var_ord.prop.Value='num_pry'
   
  }

} // End ThisForm
