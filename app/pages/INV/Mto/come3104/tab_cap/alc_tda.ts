//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editBox
// Class : alc_tda
// Description : Componente alc_tda
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COLUMN } from "@/classes/Column";
//imports

export class alc_tda extends COLUMN {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "editBox";
    this.prop.ColumnTextLabel = "Alm. de cliente";
    this.prop.Type = 'checkBox';
    this.prop.Caption = "Si";
    this.prop.ControlSource = "vi_cap_tda.alc_tda";
    this.prop.Name = "alc_tda";

    //propiedades
  }


  // Evento   : When 
  // Comentarios : 
  override async when() {
    this.prop.Valid = true
    this.prop.ReadOnly = !this.Parent.alm_tda.prop.Valid
    return true

  }   // Fin Procedure
  //metodo
}