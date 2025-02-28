//////////////////////////////////////////////
// Clase : sis_sis
// Descripcion : Sistema a dar mantenimiento
// Author : Fernando Cuadras Angulo
// Creacion : 4/Octubre /2022
// Ult.Mod  : 4/Octubre /2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////

import { COMPONENT } from "@/classes/Component";

export class sis_sis extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();

    this.prop.BaseClass = "comboBox";
    this.prop.textLabel = "Menú de sistemas";
    this.prop.Capture = false;
    //this.prop.Sw_val = false;
    this.prop.ErrorMessage = "";
    this.prop.Value = "S";
    // Si es un comboBox no olvidar todas estas reglas
    this.prop.RowSource =
      "select des_prg,sis_sis from vi_cap_prg where sis_sis > '    ' and  tpr_prg = 'S'  union \
       select '~ SQL Dictionary ~' as des_prg,'CFG' as sis_sis union \
       select '~ without classification ~' as des_prg,'   ' as sis_sis ";
    this.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidth = "300px,50px";
    this.prop.Style = 2; //0=DropDown Combo 2=DropDown List
    this.prop.Visible = true;

    this.inputStyle.fontSize = "17px";
    this.inputStyle.fontWeight = "bold";
    this.inputStyle.width = "350px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
    //this.style.zIndex=2
  }

  async when() {
    this.prop.RowSourceType = 0; //1-Value, 2-Alias,3-sql, 5-Array

    this.Form.grid_menu.prop.Visible = false;
    this.Form.grid_tablas.prop.Visible = false;
    this.Form.grid_vistas.prop.Visible = false;
    this.Form.grid_indices.prop.Visible = false;
    this.Form.grid_datos.prop.Visible = false;
    this.Form.bt_gen_model.prop.Visible = false;
    this.Form.bt_gen_all_models.prop.Visible = false;

    this.Form.bt_gen_indices.prop.Visible = false;
    this.Form.bt_gen_vistas.prop.Visible = false;

    this.Form.bt_aceptar.prop.Visible = true;
    this.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql, 5-Array

    this.Form.nom_tab.prop.RowSourceType = 0
    this.Form.nom_tab.prop.RowSource = ''
    this.Form.nom_tab.prop.Value = ''
    this.Form.nom_tab.prop.Visible = false;
    this.Form.bt_aceptar.prop.Value = 'Accept';


    //  this.Form.dic_dat.when(true)
    return true;
  }


  override async valid() {
    // if (this.Form.nom_tab.prop.Visible) {

    // Tablas o diseño de Tablas

    if (this.Form.dic_dat.prop.Value == 'D') {
      this.Form.nom_tab.prop.RowSourceType = 0
      this.Form.nom_tab.prop.RowSource = ''
      this.Form.nom_tab.prop.Value = ''
      this.Form.nom_tab.prop.Visible = false
      this.Form.bt_aceptar.prop.Visible = false;


      let where = ''
      if (this.prop.Value > '   ')
        where = ` where sis_sis = '${this.prop.Value.trim()}'`

      await this.Sql.execute(`select des_tab,nom_tab,sis_sis from vi_cap_cometab ${where} order by sis_sis,nom_tab`, 'cap_cometab')

      if (this.Sql.View.cap_cometab && this.Sql.View.cap_cometab.recnoVal.length > 0) {
        this.Form.nom_tab.prop.RowSource = `select des_tab,nom_tab,sis_sis from cap_cometab `
        this.Form.nom_tab.prop.RowSourceType = 4; //1-Value, 2-Alias,3-sql 5-Array
        this.Form.bt_aceptar.prop.Visible = true;
        this.Form.nom_tab.prop.Visible = true;

      }
      return true
    }
    this.Form.bt_aceptar.prop.Visible = true;
    return true
  }

}
