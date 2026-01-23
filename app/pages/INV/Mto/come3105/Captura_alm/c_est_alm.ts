//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : header
// @class : c_est_alm
// Description : Componente c_est_alm
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 03/06/25
// Update Date  :
/////////////////////////////////////////////
// import {header} from "@/classes/header";

import { COLUMN } from "@/classes/Column";
//imports

export class c_est_alm extends COLUMN {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "comboBox";
    this.prop.ControlSource = "vi_cap_alm.est_alm";
    this.prop.RowSource = [
      ['Activo', 'Bloqueado', 'Promoción', 'Mantenimiento', 'Desactivo'],
      ['A', 'B', 'P', 'M', 'D']];
    this.prop.RowSourceType = 5; //1-Value, 2-Alias, 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "150px,0px";

    this.prop.ColumnTextLabel = "Estatus";

    this.style.width = "112px";

    //propiedades
  }
  override async when() {
    this.prop.Valid = this.Parent.c_alm_tda.prop.Valid
    this.prop.ReadOnly = !this.prop.Valid
    return this.prop.Valid
  }   // Fin Procedure



  //metodo
}