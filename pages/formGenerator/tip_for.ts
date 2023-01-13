//////////////////////////////////////////////
// Clase : tip_for
// Descripcion : tipo de forma de mantenimiento 
// Author : Fernando Cuadras Angulo
// Creacion : Diciembre/2021
// Ult.Mod  : 3/Octubre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from '@/classes/Component'


export class tip_for extends COMPONENT {

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
   
    this.prop.BaseClass='comboBox'
    this.prop.textLabel = "Forma de captura";
    this.prop.ReadOnly = false;
    this.prop.Capture = false;
    this.prop.Sw_val = false;
    this.prop.ErrorMessage = ''
    this.prop.RowSource = [
      ["Forma de Captura", "Grid","Reporte"],
      ["F",          "G","R"],
    ]; // vi_cap_doc.tdo_tdo,des_tdo
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%";
    this.prop.Value = "P";
    this.prop.Visible= true
    this.style.zIndex=2
  }
   
async when() {
  //this.Form.sis_sis.prop.Visible=false
  //this.Form.grid_menu.prop.Visible=false
  return true  
  }  
}
