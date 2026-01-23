//////////////////////////////////////////////
// Clase : vis_grid
// Descripcion : Nombre de la vista de captura a utilizar de la tabla
// @author: Fernando Cuadras Angulo
// Creacion : 17/Octubre/2022
// Ult.Mod  : 13/Febrero/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class vis_grid extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();

    this.prop.BaseClass = "comboBox";
    this.prop.Visible = false;
    this.prop.Caption = "Vista de captura del grid";
    this.prop.Capture = true; // al quitarlo, quito reactividad oJo
    this.prop.Valid = false;
    this.prop.ErrorMessage = "";
    this.prop.Value = "";
    this.prop.RowSource = `select des_vis,nom_vis from vi_cap_comevis order by nom_tab`;
    this.prop.RowSourceType = 0;

    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "80%,30%";
    this.prop.Style = "2"; //0=DropDown Combo 2=DropDown List
    this.inputStyle.width = "400px";
    this.style.width = "600px";
    //this.style.zIndex=2
  }

  public async when() {
    this.Form.grid_form.prop.Visible = false;
    this.Form.grid_columns.prop.Visible = false;
    return true;
  }
}
