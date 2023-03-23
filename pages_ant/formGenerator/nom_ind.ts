//////////////////////////////////////////////
// Clase : nom_ind
// Descripcion : Nombre del indice a utilizar para la actualizacion de la tabla
// Author : Fernando Cuadras Angulo
// Creacion : 17/Octubre/2022
// Ult.Mod  : 13/Febrero/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class nom_ind extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()

    this.prop.BaseClass = 'comboBox'
    this.prop.Visible = true
    this.prop.textLabel = "Indices de la Tabla";
    this.prop.Capture = true // al quitarlo, quito reactividad oJo
    this.prop.Valid = false
    this.prop.ErrorMessage = ''
    this.prop.Value = ""
    this.prop.RowSourceType =0 //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = 'vi_cap_ind.nom_ind,exp_ind'
    this.prop.ReadOnly=false
    this.prop.ColumnCount = 2
    this.prop.BoundColumn = 1
    this.prop.ColumnWidths = "50%,50%"
    this.prop.Visible = true
    this.prop.Style = '2' //0=DropDown Combo 2=DropDown List
    this.style.zIndex=3
  }
 
  public async when() {
    this.Form.bt_gen_forma.prop.Visible= false
    this.Form.grid_captura.prop.Visible = false
    this.Form.grid_components.prop.Visible = false

  return true
}



  }



