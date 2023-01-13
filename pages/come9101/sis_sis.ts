//////////////////////////////////////////////
// Clase : sis_sis
// Descripcion : Sistema a dar mantenimiento
// Author : Fernando Cuadras Angulo
// Creacion : 4/Octubre /2022
// Ult.Mod  : 4/Octubre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'

export class sis_sis extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.Visible= false
    this.prop.BaseClass='comboBox'
    this.prop.textLabel = "Menú de sistemas";
    this.prop.Capture = false
    this.prop.Sw_val = false
    this.prop.ErrorMessage = ''
    this.prop.Value = "S"
    // Si es un comboBox no olvidar todas estas reglas 
    this.prop.RowSource = "vi_cap_prg.des_prg,sis_sis"
    this.prop.RowSourceType = 0 //1-Value, 2-Alias,3-sql, 5-Array
    this.prop.ColumnCount = 2
    this.prop.BoundColumn = 2
    this.prop.ColumnWidths = "75%,25%"
    this.prop.Style = 2; //0=DropDown Combo 2=DropDown List

    this.style.zIndex=2
  }
 
  async when() {
    this.Form.grid_menu.prop.Visible=false
  return true
  }

}
