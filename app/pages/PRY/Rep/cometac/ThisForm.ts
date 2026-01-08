//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisform
// Description : Catálogo de actividades
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

    this.prop.Name = 'cometac'
    this.prop.Caption = "Catálogo de actividades"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vcometac'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'rep_cometac'   // no incluir extencion jasper o jrxml
    this.var_ord.prop.Value = 'tap_tap'
    this.tab_ord = 'cometac'
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.tip_rep.prop.Visible = false
    this.tip_rep.prop.Disabled = true
    this.des_fec.prop.Visible = false
    this.des_fec.prop.Disabled = true
    this.has_fec.prop.Visible = false
    this.has_fec.prop.Disabled = true

    this.prop.cam_pri = 'tap_tap' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["tap_tap", "Clave", "''", "'ZZZ'"],
      ["des_tap", "Descripción", "''", "'ZZZ'"]
    ]
    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    this.block[0].prop.Visible = false
    this.block[0].prop.Disabled = true
    this.block[1].prop.Visible = false
    this.block[1].prop.Disabled = true

  }

} // End ThisForm
