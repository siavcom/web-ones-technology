//////////////////////////////////////////////
// BaseClass : reportForm
// Class : Teams
// Description : Tipos de proyectos
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
 
    this.prop.Name = 'cometap'
    this.prop.textLabel = "Catálogo de actividades por proyecto"
    this.prop.Status = 'A'
    this.prop.Development=true
    this.vis_rep = 'vcometap'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value ='rep_cometap'   // no incluir extencion jasper o jrxml
    this.var_ord.prop.Value='tap_tap'
    this.tab_ord='cometap'
    this.mon_rep.prop.Visible=false
    this.mon_rep.prop.Disabled=true
    this.tip_rep.prop.Visible=false
    this.tip_rep.prop.Disabled=true

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
  } 

} // End ThisForm
