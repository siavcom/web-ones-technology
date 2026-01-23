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
    super(0)  // inicializa la clase base
    this.prop.Name = 'cometpy'
    this.prop.Caption = "Catálogo tipos de proyecto"
    this.prop.Status = 'A'
    this.prop.Development = true
    this.vis_rep = 'vi_rep_cometpy'   // nombre de la vista sql a utilizar en el reporte
    // this.for_imp.prop.Value ='TiposProyectos'   // no incluir extencion jasper o jrxml
    this.for_imp.prop.Value = 'rep_cometpy'   // no incluir extencion jasper o jrxml
    this.var_ord.prop.Value = 'tpy_tpy'
    this.tab_ord = 'cometpy'
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
      ["tpy_tpy", "Clave", "''", "'ZZZ'"],
      ["des_tpy", "Descripción", "''", "'ZZZ'"]
    ]
    this.block[0].prop.Visible = false
    this.block[0].prop.Disabled = true
    this.block[1].prop.Visible = false
    this.block[1].prop.Disabled = true



  }
  public async init() {
    await super.init()

    this.var_ord.prop.Value = "";
    console.log(
      "===================>Init Report name=",
      this.prop.Name,
      "var_ord",
      this.var_ord.prop.Value = "tpy_tpy"
    );

  }


} // End ThisForm
