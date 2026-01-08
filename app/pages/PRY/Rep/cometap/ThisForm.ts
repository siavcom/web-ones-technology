//////////////////////////////////////////////
// BaseClass : reportForm
// Class : thisForm
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
    super(0)  // inicializa la clase base

    this.prop.Name = 'cometap'
    this.prop.Caption = "Catálogo de actividades por proyecto"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vcometap'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value = 'rep_cometap'   // no incluir extencion jasper o jrxml
    this.var_ord.prop.Value = 'tpy_tpy'
    this.ord_vis = 'ord_tap'
    this.tab_ord = 'man_cometap'
    this.mon_rep.prop.Visible = false
    this.mon_rep.prop.Disabled = true
    this.tip_rep.prop.Visible = false
    this.tip_rep.prop.Disabled = true
    this.des_fec.prop.Visible = false
    this.des_fec.prop.Disabled = true
    this.has_fec.prop.Visible = false
    this.has_fec.prop.Disabled = true

    this.prop.cam_pri = 'tpy_tpy' // campo de buqueda principal
    // Campos de orden de la vista
    this.fields = [
      ["tpy_tpy", "Tipo de proyecto", "''", "'ZZZ'"],
      ["tap_tap", "Actividad", "''", "'ZZZ'"]
    ]
    this.block[0].prop.Visible = false
    this.block[0].prop.Disabled = true
    this.block[1].prop.Visible = false
    this.block[1].prop.Disabled = true

  }

} // End ThisForm
