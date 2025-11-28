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
    this.prop.Caption = "Menú de sistemas";
    this.prop.Capture = false;
    //this.prop.Sw_val = false;
    this.prop.ErrorMessage = "";
    this.prop.Value = "S";
    // Si es un comboBox no olvidar todas estas reglas
    this.prop.RowSource =
      "select des_prg,sis_sis from vi_cap_prg where sis_sis > '    ' and  tpr_prg = 'S'  union \
    select '~ SQL Dictionary ~' as des_prg,'CFG' as sis_sis union \
    select '~ without classification ~' as des_prg,'   ' as sis_sis ";
    /*
          "select des_prg,sis_sis from vi_cap_prg where sis_sis > '    ' and  tpr_prg = 'S'  union \
           select '~ SQL Dictionary ~' as des_prg,'CFG' as sis_sis union \
           select '~ without classification ~' as des_prg,'   ' as sis_sis ";
           */
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
    this.Form.tab_form.prop.Visible = false;
    this.Form.tab_grid.prop.Visible = false;
    this.Form.nom_for.prop.Visible = false;
    this.Form.bt_aceptar.prop.Visible = false;

    return true
  }

  override async interactiveChange() {

    //    this.Form.tab_form.prop.RowSourceType = 0
    this.Form.tab_form.prop.RowSource = ''
    this.Form.tab_form.prop.Value = ''
    this.Form.tab_form.prop.Visible = false
    this.Form.bt_aceptar.prop.Visible = false;

    let where = ''
    if (this.prop.Value > '   ')
      where = ` where sis_sis = '${this.prop.Value.trim()}'`


    this.Form.tab_form.prop.Visible = false;
    this.Form.tab_grid.prop.Visible = false;
    if (this.Form.tip_for.prop.Value == "C" || this.Form.tip_for.prop.Value == "F") {

      this.Form.tab_form.prop.RowSource = `select des_tab,nom_tab,sis_sis from vi_cap_cometab ${where} order by sis_sis,nom_tab`
      //    this.Form.tab_form.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql 5-Array
      this.Form.tab_form.prop.Visible = true;
    }

    if (this.Form.tip_for.prop.Value == "C" || this.Form.tip_for.prop.Value == "G") {
      this.Form.tab_grid.prop.RowSource = `select des_tab,nom_tab,sis_sis from vi_cap_cometab ${where} order by sis_sis,nom_tab`
      this.Form.tab_grid.prop.Visible = true;

    }





    return true
  }

}
