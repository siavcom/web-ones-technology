//////////////////////////////////////////////
// Clase : vis_cap
// Descripcion : Nombre del indice a utilizar para la actualizacion de la tabla
// Author : Fernando Cuadras Angulo
// Creacion : 17/Octubre/2022
// Ult.Mod  : 13/Febrero/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class vis_cap extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()

    this.prop.BaseClass = 'comboBox'
    this.prop.Visible = false
    this.prop.textLabel = "Vista de captura grid";
    this.prop.Capture = true // al quitarlo, quito reactividad oJo
    this.prop.Valid = false
    this.prop.ErrorMessage = ''
    this.prop.Value = ""
    this.prop.RowSource = `select nom_vis,nom_tab from vi_cap_vis order by nom_tab`
    this.prop.RowSourceType=3

    this.prop.ColumnCount = 2
    this.prop.BoundColumn = 1
    this.prop.ColumnWidths = "50%,50%"
    this.prop.Style = '2' //0=DropDown Combo 2=DropDown List
    this.style.zIndex=2
  }

  public async when() {
    this.Form.grid_captura.prop.Visible = false
    this.Form.grid_components.prop.Visible = false
  return true
}


}
