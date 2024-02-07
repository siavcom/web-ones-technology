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
    // this.prop.Visible = false;
    this.prop.BaseClass = "comboBox";
    this.prop.textLabel = "Menú de sistemas";
    this.prop.Capture = false;
    this.prop.Sw_val = false;
    this.prop.ErrorMessage = "";
    this.prop.Value = "S";
    // Si es un comboBox no olvidar todas estas reglas
    this.prop.RowSource =
      "select des_prg,sis_sis from vi_cap_prg where sis_sis > '    ' and  tpr_prg = 'S'  union \
       select '~ Configuración ~' as des_prg,'CFG' as sis_sis union \
       select '~ Sin clasificar ~' as des_prg,'   ' as sis_sis ";
    this.prop.RowSourceType = 3; //1-Value, 2-Alias,3-sql, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "200px,50px";
    this.prop.Style = 2; //0=DropDown Combo 2=DropDown List
    this.style.width = "650px";
    this.inputStyle.width = "200px";

    //this.style.zIndex=2
  }

  async when() {
    this.Form.grid_menu.prop.Visible = false;
    return true;
  }
}
