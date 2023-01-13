//////////////////////////////////////////////
// Clase : tip_men
// Descripcion : tipo de mantenimiento de MENU
// Creacion : Diciembre/2021
// Ult.Mod  : 19/Diciembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'


export class tip_men extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
   
    this.prop.BaseClass='comboBox'
    this.prop.textLabel = "Tipo de menú";
    this.prop.ReadOnly = false;
    this.prop.Capture = false;
    this.prop.Sw_val = false;
    this.prop.ErrorMessage = ''
    this.prop.RowSource = [
      ["Principal", "Programa"],
      ["S",          "P"],
    ]; // vi_cap_doc.tdo_tdo,des_tdo
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%";
    this.prop.Value = "S";
    this.prop.Visible= false
    this.style.zIndex=2
  }
   
async when() {
  this.Form.sis_sis.prop.Visible=false
  this.Form.grid_menu.prop.Visible=false
  return true  
  }  
}
