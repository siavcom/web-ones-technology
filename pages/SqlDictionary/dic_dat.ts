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
    this.prop.textLabel = "Diccionario  de datos";
    this.prop.ToolTipText = this.prop.textLabel;
    this.prop.ReadOnly = false;
    this.prop.Capture = false;
    // ["Definicion de Tabla", "Tablas del SQL Server", "Indices", "Vistas de captura", "Menú de programas"],
    // ["D", "T", "I", "V", "M"],

    this.prop.RowSource = [
      ["Tablas del SQL Server", "Definicion de Tabla", "Menú de programas"],
      ["T", "D", "M"]
    ];
    this.prop.ControlSource = "vi_cap_comedat.dic_dat";
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "200px,10px";

    this.inputStyle.fontSize = "17px";
    this.inputStyle.fontWeight = "bold";
    this.inputStyle.width = "300px";
    this.style.width = "500px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";

    //this.style.zIndex=3
  }
  async interactiveChange() {
    this.Form.nom_tab.prop.Visible = false
    this.Form.bt_gen_all_models.prop.Visible = false
    if (this.prop.Value == "M") {
      this.Form.sis_sis.prop.Visible = false;
      this.Form.bt_aceptar.prop.Visible = true;
    } else {

      this.Form.sis_sis.prop.Visible = true;
      this.Form.bt_aceptar.prop.Visible = false;

    }
  }


  // init del componente
  public init = async (form: any) => {
    // await super.Init(form)
    this.prop.Value = "T";
    //this.Form.nom_tab.Visible = true;
  };

  public async when(sis_sis?: boolean) {

    if (!sis_sis) {
      // this.Form.sis_sis.prop.Visible = false
    }
    await this.interactiveChange()

    this.Form.nom_tab.prop.Visible = false;
    this.Form.tpr_prg.prop.Visible = false;


    this.Form.grid_datos.prop.Visible = false;
    this.Form.grid_indices.prop.Visible = false;
    this.Form.grid_vistas.prop.Visible = false;
    this.Form.grid_menu.prop.Visible = false;
    this.Form.grid_tablas.prop.Visible = false;

    this.Form.bt_gen_model.prop.Visible = false;
    this.Form.bt_gen_indices.prop.Visible = false;
    this.Form.bt_gen_vistas.prop.Visible = false;
    this.Form.bt_gen_all_models.prop.Visible = false;
    //this.interactiveChange()


    return !this.prop.ReadOnly;
  }

}
