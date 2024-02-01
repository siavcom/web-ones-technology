//////////////////////////////////////////////
// Clase : dic_dat
// Descripcion : tipo de mantenimiento del diccionario de datos
// Author : Fernando Cuadras Angulo
// Creacion : Diciembre/2021
// Ult.Mod  : 6/Septiembre/2022
/////////////////////////////////////////////

///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class dic_dat extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    //  this.Name = 'dic_dat'
    this.prop.BaseClass = "comboBox";
    this.prop.textLabel = "Tipo de diccionario  de datos";
    this.prop.ToolTipText = this.prop.textLabel;
    this.prop.ReadOnly = false;
    this.prop.Capture = false;
    this.prop.RowSource = [
      ["Tablas del SQL Server", "Definicion de Tabla", "Menú de programas"],
      ["T", "D", "M"],

      // ["Definicion de Tabla", "Tablas del SQL Server", "Indices", "Vistas de captura", "Menú de programas"],
      // ["D", "T", "I", "V", "M"],
    ]; // vi_cap_doc.tdo_tdo,des_tdo
    this.prop.ControlSource = "vi_cap_comedat.dic_dat";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "300px,10px";
    this.style.width = "400px";
    this.inputStyle.width = "200px";

    //this.style.zIndex=3
  }
  // init del componente
  public init = async (form: any) => {
    // await super.Init(form)
    this.prop.Value = "T";
    this.Form.nom_tab.Visible = true;
  };

  public async when() {
    this.Form.nom_tab.prop.Visible = false;
    this.Form.sis_sis.prop.Visible = false;
    this.Form.tpr_prg.prop.Visible = false;

    this.Form.grid_datos.prop.Visible = false;
    this.Form.grid_indices.prop.Visible = false;
    this.Form.grid_vistas.prop.Visible = false;
    this.Form.grid_menu.prop.Visible = false;
    this.Form.grid_tablas.prop.Visible = false;

    this.Form.bt_gen_model.prop.Visible = false;
    this.Form.bt_gen_indices.prop.Visible = false;
    this.Form.bt_gen_vistas.prop.Visible = false;
    this.Form.bt_gen_all_models.Visible = true;

    return !this.prop.ReadOnly;
  }

  public async valid_old() {
    // await super.valid()
    console.log("dic_dat valid", this.prop.Value);

    //const This = this.prop; // Hace referencia a las propiedades del componente

    if (
      this.prop.Value == "D" ||
      this.prop.Value == "V" ||
      this.prop.Value == "I"
    ) {
      // Datos , Vistas o Indices

      this.Form.nom_tab.prop.Visible = true;
      this.Form.nom_tab.setFocus();
    }

    return true;
  }
}
