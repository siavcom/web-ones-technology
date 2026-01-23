//////////////////////////////////////////////
// Clase : nom_tab
// Descripcion : Nombre de la tabla base para generar la forma de captura
// @author: Fernando Cuadras Angulo
// Creacion : 17/Octubre/2022
// Ult.Mod  : 04/Julio/2023
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
//import { nextTick } from 'vue';

export class tab_form extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();

    this.prop.BaseClass = "comboBox";
    this.prop.Visible = true;
    this.prop.Caption = "Tabla de captura para el form";
    this.prop.Capture = true; // al quitarlo, quito reactividad oJo
    this.prop.Valid = false;
    this.prop.ErrorMessage = "";
    this.prop.Value = "";
    this.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = '' //      "select des_tab,nom_tab from vi_cap_cometab order by nom_tab";
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.Style = "2"; //0=DropDown Combo 2=DropDown List
    this.prop.ColumnWidths = "350px,125px";
    this.inputStyle.width = "250px";
    this.style.width = "580px";
    this.prop.Visible = false;


    this.inputStyle.fontSize = "17px";
    this.inputStyle.fontWeight = "bold";
    this.inputStyle.width = "350px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";

    // this.style.zIndex = 4
  }

  public async when() {
    this.Form.nom_ind.prop.RowSourceType = 0;
    this.Form.bt_gen_forma.prop.Visible = false;
    this.Form.grid_form.prop.Visible = false;
    this.Form.grid_columns.prop.Visible = false;
    return true;
  }

  public async valid() {
    //    this.Form.nom_ind.prop.RowSourceType = 0
    //    await this.Form.db.execute(`select nom_ind,exp_ind from vi_cap_comeind where nom_tab='${this.prop.Value}' `, 'vi_cap_comeind')
    //    this.Form.nom_ind.prop.RowSourceType = 2

    this.Form.vis_form.prop.RowSourceType = 0;
    const nom_tab = this.prop.Value.trim();
    this.Form.vis_form.prop.RowSource = `select des_vis,nom_vis from vi_cap_comevis where nom_tab='${nom_tab}' `;
    this.Form.vis_form.prop.RowSourceType = 3;
    this.Form.vis_form.prop.Visible = true;

    return true;
  }
}
