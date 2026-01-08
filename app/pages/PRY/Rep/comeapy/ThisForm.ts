//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
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
    super(0)  // inicializa la clase base
    this.tab_ord = 'comeapy' // Tabla de donde tomara los campos para el orden de la vista
    this.prop.Name = 'comeapy'
    this.prop.Caption = "Actividades del Proyecto"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_rep_comeapy'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'rep_comeapy'   // no incluir extencion jasper o jrxml
    this.prop.cam_pri = 'ven_ven' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["ven_ven", "Numero de vendedor", "1", "9999"],
      ["nom_ven", "Nombre de vendedor", "", "ZZZZZZZZZZZZ"]
    ]

  }
  public async init() {
    await super.init()
    this.var_ord.prop.Value = 'num_pry'

  }

} // End ThisForm
