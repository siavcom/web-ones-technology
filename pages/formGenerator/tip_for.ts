//////////////////////////////////////////////
// Clase : tip_for
// Descripcion : tipo de forma de mantenimiento
// Author : Fernando Cuadras Angulo
// Creacion : Diciembre/2021
// Ult.Mod  : 4/Julio /2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class tip_for extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();

    this.prop.BaseClass = "comboBox";
    this.prop.textLabel = "Forma de captura";
    this.prop.ReadOnly = false;
    this.prop.Capture = false;
    this.prop.Valid = false;
    this.prop.RowSource = [
      ["Forma de Captura", "Grid/Tabla", "Form/Grid compuesto", "Reporte"],
      ["F", "G", "C", "R"],
    ]; // vi_cap_doc.tdo_tdo,des_tdo
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.Value = "F";
    this.prop.ColumnWidths = "150px,25px";
    this.prop.componentStyle.width = "250px";
    this.style.width = "400px";
  }

  async when() {
    this.Form.tab_form.prop.Visible = false;
    this.Form.tab_grid.prop.Visible = false;

    this.Form.vis_form.prop.Visible = false;
    this.Form.vis_grid.prop.Visible = false;

    this.Form.grid_columns.prop.Visible = false;
    this.Form.grid_form.prop.Visible = false;

    this.Form.bt_gen_forma.prop.Visible = false;
    this.Form.bt_aceptar.prop.Visible = false;

    return true;
  }
  async valid() {
    if (this.prop.Value == "C" || this.prop.Value == "F")
      this.Form.tab_form.prop.Visible = true;

    if (this.prop.Value == "C" || this.prop.Value == "G")
      this.Form.tab_grid.prop.Visible = true;

    return true;
  }
}
