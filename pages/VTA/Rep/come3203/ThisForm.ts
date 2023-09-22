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
    this.tab_ord='comeisu'
    this.prop.Name = 'come3203'
    this.prop.textLabel = "Existencias"
    this.prop.Status = 'A'
    this.prop.Development=true
    this.vis_rep = 'vi_come3203'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value ='jr_come3203'   // no incluir extencion jasper o jrxml
    this.sqlQuery=' SELECT * FROM dbo.f_rep_come3203("${m.des_fec}","${m.has_fec}","${m.desde}","${m.hasta}","${m.alm_rep}","${m.con_rep}","${m.tip_rep}","${m.tip_imp}") order by cla_isu,alm_tda'
    this.tip_rep.prop.Visible=true    // Muestra general odetallado

    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
  } 

public async init(){
  await super.init()
  this.var_ord.prop.Value='cla_isu'

  console.log('===================>Init Report name=',this.prop.Name,'var_ord',this.var_ord.prop.Value)
 
}


public async afterMounted() {

  console.log('===================>afterMounted',this.Name,'var_ord',this.var_ord.prop.Value)


}

} // End ThisForm
