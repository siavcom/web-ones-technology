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
      ["E", "C"]],
      this.prop.Value = "C"
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "160px,0px";
    this.style.width = "200px";
    this.style.marginLeft = "10px";
    this.inputStyle.height = '23px'
    this.inputStyle.width = '256px'

    this.inputStyle.fontSize = "17px";
    this.inputStyle.fontWeight = "bold";
    this.style.fontSize = "17px";
    this.style.fontWeight = "bold";



  }

  async when() {

    if (this.prop.Value == 'E') {
      this.Parent.des_dat.prop.Caption = 'Desde '
      this.Parent.des_dat.prop.Visible = true
      this.Parent.has_dat.prop.Visible = true
    } else {
      this.Parent.des_dat.prop.Caption = ''
      this.Parent.des_dat.prop.Visible = true
      this.Parent.has_dat.prop.Visible = false
    }

    if (this.Parent.cam_dat.Type == 'string') {
      this.prop.ReadOnly = false
      return true
    }
    this.prop.ReadOnly = true
    return false


  }
  async interactiveChange() {
    if (this.Parent.cam_dat.Type == 'string')
      if (this.prop.Value == 'C') {
        this.Parent.des_dat.prop.Caption = ''
        this.Parent.has_dat.prop.Visible = false
        return
      }
    this.prop.Value = 'E'
    this.Parent.des_dat.prop.Caption = '' //'Desde '
    this.Parent.has_dat.prop.Visible = true

  }

}
