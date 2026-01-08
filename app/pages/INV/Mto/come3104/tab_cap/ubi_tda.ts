//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editBox
// Class : ubi_tda
// Description : Componente ubi_tda
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COLUMN } from "@/classes/Column";
//imports

export class ubi_tda extends COLUMN {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "editBox";
    this.prop.ColumnTextLabel = "Localizacón /Ubicación geográfica";
    this.prop.WordWrap = true;
    this.prop.Type = 'text';
    this.prop.ControlSource = "vi_cap_tda.ubi_tda";
    this.position.Left = 73;
    this.prop.Name = "ubi_tda";

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