//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editBox
// Class : cos_tda
// Description : Componente cos_tda
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COLUMN } from "@/classes/Column";
//imports

export class cos_tda extends COLUMN {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "editBox";
    this.prop.ColumnTextLabel = "Max. costo de almacen cliente";
    this.prop.Type = 'number';
    this.prop.Decimals = 2;
    this.prop.ControlSource = "vi_cap_tda.cos_tda";
    this.prop.InputMask = "999,999,999.99";
    this.prop.Name = "cos_tda";
    this.style.width = "124px";

    //propiedades
  }


  // Evento   : When 
  // Comentarios : 
  override async when() {
    this.prop.Valid = true
    this.prop.ReadOnly = ! await this.Parent.alm_tda.prop.Valid
    return true

  }   // Fin Procedure
  //metodo
}