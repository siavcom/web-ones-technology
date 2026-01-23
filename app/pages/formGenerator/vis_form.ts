//////////////////////////////////////////////
// Clase : vis_form
// Descripcion : Nombre de la vista de captura a utilizar de la tabla
// @author: Fernando Cuadras Angulo
// Creacion : 17/Octubre/2022
// Ult.Mod  : 13/Febrero/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class vis_form extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();

    this.prop.BaseClass = "comboBox";
    this.prop.Visible = false;
    this.prop.Caption = "Vista de captura forma principal";
    this.prop.Capture = true; // al quitarlo, quito reactividad oJo
    this.prop.Valid = false;
    this.prop.ErrorMessage = "";
    this.prop.Value = "";
    this.prop.RowSource = `select des_vis,nom_vis from vi_cap_comevis order by nom_tab`;
    this.prop.RowSourceType = 0;

    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;

    this.prop.Style = "2"; //0=DropDown Combo 2=DropDown List
    this.prop.ColumnWidths = "350px,125px";
    this.inputStyle.width = "250px";
    this.style.width = "450px";
    //this.style.zIndex=2
  }

  public override async when() {
    this.Form.grid_form.prop.Visible = false;
    this.Form.grid_columns.prop.Visible = false;
    return true;
  }

  public async valid() {
    this.Form.nom_for.prop.Visible = true;
    return true
  }
}
