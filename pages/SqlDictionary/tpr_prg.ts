//////////////////////////////////////////////
// Clase : tpr_prg
// Descripcion : TIPO DE PROGRAMA M=MANTENIMIENTO; R=REPORTE; P=PROCESO
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod  07/Septiembre/2022
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";

export class tpr_prg extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.prop.textLabel = "Tipo de menú";
    this.prop.BaseClass = "comboBox";
    this.prop.ToolTipText = "Tipo de programa";
    this.prop.RowSource = [
      ["Mantenimiento", "Reporte", "Proceso", "Menú principal"],
      ["M", "R", "P", "S"],
    ]; // vi_cap_doc.tdo_tdo,des_tdo
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "150px,10px";

    this.inputStyle.fontSize = "17px";
    this.inputStyle.fontWeight = "bold";
    this.inputStyle.width = "300px";
    this.style.width = "500px";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";
    this.prop.Visible = false;
  }


  async when() {
    this.Form.sis_sis.prop.Visible = false;
    this.Form.nom_tab.prop.Visible = false;
    this.Form.grid_menu.prop.Visible = false;
    this.Form.bt_aceptar.prop.Value = 'Accept';
    return true;
  }
}
