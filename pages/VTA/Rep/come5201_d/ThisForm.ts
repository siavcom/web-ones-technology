//////////////////////////////////////////////
// BaseClass : reportForm
// Class : Teams
// Description : Documentos
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
 
    this.prop.Name = 'come5201_d'
    this.prop.textLabel = "Documentos"
    this.prop.Status = 'A'
    this.prop.Development=true
    this.vis_rep = 'vi_come5201_d'  // nombre de la vista sql a utilizar en el reporte

    this.tab_ord = 'comedoc'  // nombre de la tabla sql a utilizar en el condicion de orden del reporte    
this.for_imp.prop.Value ='jr_come5201_d'   // no incluir extencion jasper o jrxml
    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
  } 
  
public async init(){
  await super.init()
  this.var_ord.prop.Value='ndo_doc'

  console.log('===================>Init Report name',this.Name,'var_ord',this.var_ord.prop.Value)
 
}  
  
  

} // End ThisForm
