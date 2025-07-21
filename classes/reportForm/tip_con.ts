//////////////////////////////////////////////
// Clase : tip_con
// Descripcion : TIPO DE CONDICION
// Author : Fernando Cuadras Angulo
// Creacion : Mayo/2022
// Ult.Mod 23/abril/2'24
/////////////////////////////////////////////
///////////////////////////////////////
// Clase base
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";

export class tip_con extends COMPONENT {
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();

    this.prop.BaseClass = "comboBox";
    this.prop.RowSource = [
      ["Que los datos esten entre", "El valor que contenga"],
      ["E", "C"]]
    this.prop.Value = "E"
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "160px,0px";
    this.style.width = "min-content";
    this.inputStyle.width = "180px";
    this.style.marginLeft = "10px";

  }


  override async when() {

    if (this.Parent.var_ord.Type == 'text') {
      this.prop.ReadOnly = false
      return true
    }
    this.prop.ReadOnly = true
    return false

  }
  override async interactiveChange() {
    if (this.prop.Disabled)
      return
    if (this.Parent.var_ord.Type == 'text')
      if (this.prop.Value == 'C') {
        this.Parent.des_dat.prop.Caption = ''
        this.Parent.has_dat.prop.Visible = false
        return
      }
    this.Parent.des_dat.prop.Caption = 'Desde'
    this.prop.Value = 'E'
    this.Parent.has_dat.prop.Visible = true

  }

}
