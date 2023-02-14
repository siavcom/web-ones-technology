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

    this.prop.BaseClass = 'comboBox'
    this.prop.textLabel = "Forma de captura";
    this.prop.ReadOnly = false;
    this.prop.Capture = false;
    this.prop.Valid = false;
    this.prop.ErrorMessage = ''
    this.prop.RowSource = [
      ["Forma de Captura", "Grid/Tabla", "Reporte"],
      ["F", "G", "R"],
    ]; // vi_cap_doc.tdo_tdo,des_tdo
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%";
    this.prop.Value = "P";
    this.prop.Visible = true
    this.style.zIndex = 5
  }

  async when() {
    this.Form.vis_cap.prop.Visible = false
    this.Form.bt_gen_forma.prop.Visible= false
    this.Form.grid_captura.prop.Visible = false
    this.Form.grid_components.prop.Visible = false
    //this.Form.tab_grd.prop.Visible=false

    return true
  }

  async valid() {
    if (this.prop.Value == 'F') {



    } 
    
    if (this.prop.Value == 'F') {
      this.Form.vis_cap.prop.Visible = true
    }

    if (this.prop.Value == 'R') {
      //this.Form.vis_cap.prop.Visible = true
    }



    return true
  }
}
