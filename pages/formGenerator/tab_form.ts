//////////////////////////////////////////////
// Clase : nom_tab
// Descripcion : Nombre de la tabla base para generar la forma de captura
// Author : Fernando Cuadras Angulo
// Creacion : 17/Octubre/2022
// Ult.Mod  : 04/Julio/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'
//import { nextTick } from 'vue';


export class tab_form extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()

    this.prop.BaseClass = 'comboBox'
    this.prop.Visible = true
    this.prop.textLabel = "Tabla de captura del form";
    this.prop.Capture = true // al quitarlo, quito reactividad oJo
    this.prop.Valid = false
    this.prop.ErrorMessage = ''
    this.prop.Value = ""
    this.prop.RowSourceType = 3 //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = "select des_tab,nom_tab from vi_cap_tab order by nom_tab"
    this.prop.ColumnCount = 2
    this.prop.BoundColumn = 2
    this.prop.ColumnWidths = "50%,50%"
    this.prop.Visible = false
    this.prop.Style = '2' //0=DropDown Combo 2=DropDown List
    this.style.zIndex = 4
  }

  public async when() {
    this.Form.nom_ind.prop.RowSourceType = 0
    this.Form.bt_gen_forma.prop.Visible= false
    this.Form.grid_captura.prop.Visible = false
    this.Form.grid_components.prop.Visible = false

    return true
  }

  public async valid() {

//    this.Form.nom_ind.prop.RowSourceType = 0
//    await this.Form.db.execute(`select nom_ind,exp_ind from vi_cap_ind where nom_tab='${this.prop.Value}' `, 'vi_cap_ind')
//    this.Form.nom_ind.prop.RowSourceType = 2

       this.Form.vis_form.prop.RowSourceType = 0
       const nom_tab=this.prop.Value.trim()
       this.Form.vis_form.prop.RowSource = `select des_vis,nom_vis from vi_cap_vis where nom_tab='${nom_tab}' `
       this.Form.vis_form.prop.RowSourceType = 3
       this.Form.vis_form.prop.Visible = true


    return true
  }



}
