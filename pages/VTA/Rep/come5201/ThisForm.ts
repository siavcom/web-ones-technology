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
import { sol_cfdi } from "./sol_cfdi";

export class ThisForm extends reportForm {
  public sol_cfdi= new sol_cfdi()
 
  constructor() {
    super()  // inicializa la clase base
    this.tab_ord='comedoc'
    this.prop.Name = 'come5201'
    this.prop.textLabel = "Documentos"
    this.prop.Status = 'A'
    this.prop.Development=true
    this.vis_rep = 'vi_come5201'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value ='jr_come5201'   // no incluir extencion jasper o jrxml
    this.sqlQuery='' //' select * from man_comeisu where cla_isu>="${m.desde}" '
    this.tip_rep.prop.Visible=true    // Muestra general odetallado

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
  } 

public async init(){
  await super.init()
  this.var_ord.prop.Value='ndo_doc'

  console.log('===================>Init Report name=',this.prop.Name,'var_ord',this.var_ord.prop.Value)
 
}


public async afterMounted() {

  console.log('===================>afterMounted',this.Name,'var_ord',this.var_ord.prop.Value)


}

} // End ThisForm
