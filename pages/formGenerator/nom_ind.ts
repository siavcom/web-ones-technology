//////////////////////////////////////////////
// Clase : nom_ind
// Descripcion : Nombre del indice a utilizar para la actualizacion de la tabla
// Author : Fernando Cuadras Angulo
// Creacion : 17/Octubre/2022
// Ult.Mod  : 18/Octubre /2022
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
    this.prop.Sw_val = false
    this.prop.ErrorMessage = ''
    this.prop.Value = ""
    this.prop.RowSourceType =0 //1-Value, 2-Alias,3-sql 5-Array
//    this.prop.RowSource = "select nom_ind,exp_ind from vi_cap_ind"
    this.prop.ReadOnly=true
    this.prop.ColumnCount = 2
    this.prop.BoundColumn = 1
    this.prop.ColumnWidths = "50%,50%"
    this.prop.Visible = true
    this.prop.Style = '2' //0=DropDown Combo 2=DropDown List
    this.style.zIndex=3
  }

 async when(){
   if (this.prop.Value=='')
      await this.Parent.nom_tab.valid()
  return true
 } 


}
