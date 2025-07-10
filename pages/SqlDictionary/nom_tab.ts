//////////////////////////////////////////////
// Clase : nom_tab
// Descripcion : Tablas del servidor SQL Server
// Author : Fernando Cuadras Angulo
// Creacion : Diciembre/2020
// Ult.Mod  : 18/Octubre /2021
/////////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";


export class nom_tab extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();

    this.prop.BaseClass = "comboBox";
    this.prop.Visible = false;
    this.prop.Caption = "Tablas del SQL Server";
    this.prop.Capture = true;
    this.prop.Value = "COMETAB";
    this.prop.RowSourceType = 0; // 3   1-Value, 2-Alias,3-sql 5-Array
    this.prop.RowSource = '' // "select des_tab,nom_tab,sis_sis from vi_cap_cometab order by sis_sis,nom_tab";
    this.prop.ColumnCount = 3;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "200px,150px,150px";
    this.prop.Visible = false;
    this.prop.MultiSelect = false;
    this.prop.List = [];
    this.prop.Style = "2"; //0=DropDown Combo 2=DropDown List
    this.inputStyle.fontSize = "17px";
    this.inputStyle.fontWeight = "bold";
    this.style.width = "700px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";

  }
  override async when() {
    this.interactiveChange()
    return true
  }
  override async interactiveChange() {
    // console.log('nom_tab interactiveChange')
    this.Form.grid_datos.prop.Visible = false;
    this.Form.grid_vistas.prop.Visible = false;
    this.Form.grid_indices.prop.Visible = false;
    await this.Form.db.useNodata("vi_cap_comedat");
    await this.Form.db.useNodata("vi_cap_comeind");
    await this.Form.db.useNodata("vi_cap_comevis");
    this.Form.bt_gen_model.prop.Visible = false;
    this.Form.bt_gen_indices.prop.Visible = false;
    this.Form.bt_gen_vistas.prop.Visible = false;
    this.Form.bt_aceptar.prop.Visible = true;
    this.Form.bt_aceptar.prop.Value = this.Form.bt_aceptar.prop.Messages[17][0]; // "Aceptar";

  }
  // override async afterMounted(): Promise<void> {
  //   this.Form.bt_aceptar.prop.Value = 'Accept';
  // }
}

