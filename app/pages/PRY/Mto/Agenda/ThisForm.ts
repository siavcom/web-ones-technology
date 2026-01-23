//////////////////////////////////////////////
// This Form was generated automatically by web-ones-technology
// @baseClass  : captureForm
// @class : agenda
// Description : Agenda de actividades por usuario
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 2024-02-12
// Update Date  : 
/////////////////////////////////////////////


import { Grid } from "./grid/grid"
import { Grid as Grid_act } from '../Comepry/grid_actividades/grid'
export class ThisForm extends FORM {

  public Grid = new Grid()
  public grid_actividades = new Grid_act()
  constructor() {
    super()  // inicializa la clase base
    this.prop.Status = 'A'
    this.grid_actividades.prop.showAddButton = false;
    this.grid_actividades.prop.showDeleteButton = false;
    this.grid_actividades.prop.showSaveButton = false;
    const act = this.grid_actividades
    act.per_apy.prop.Disabled = true
    act.con_apy.prop.Disabled = true
    act.ord_tap.prop.Disabled = true
    act.tap_tap.prop.Disabled = true
    act.fpr_apy.prop.Disabled = true

    act.est_apy.prop.Disabled = true
    act.dat_apy.prop.Disabled = true
    act.obs_apy.prop.Disabled = true
    act.res_apy.prop.Disabled = true

    act.fco_apy.prop.Disabled = true
    act.fce_apy.prop.Disabled = true

    act.tdo_tdo.prop.Disabled = true
    act.ndo_ndo.prop.Disabled = true



  }
  override async init() {

    const fpr = await SQLExec('select getdate() as fpr_apy');
    const has_fec = dateToString(addDate(fpr[0].fpr_apy.slice(0, 10), 1, 'W')) // sumale una semana
    console.log("has_fec=", has_fec)

    const fpr_apy = new Date(has_fec).toString()
    this.prop.Caption = "Agenda de actividades al " + fpr_apy.slice(0, 16)

    this.Grid.leeTabla()


    console.log("init ThisForm.Grid=", this.Grid)

  }




} // End ThisForm

