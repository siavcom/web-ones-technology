//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : editBox
// @class : des_tda
// Description : Componente des_tda
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COLUMN } from "@/classes/Column";
//imports

export class des_tda extends COLUMN {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "editBox";
    this.prop.ColumnTextLabel = "Descripción";
    this.prop.Type = 'text';
    this.prop.ControlSource = "vi_cap_tda.des_tda";
    this.prop.Name = "des_tda";
    this.style.width = "300px";

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