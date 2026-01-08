//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editBox
// Class : ave_tda
// Description : Componente ave_tda
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COLUMN } from "@/classes/Column";
//imports

export class ave_tda extends COLUMN {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "editBox";
    this.prop.ColumnTextLabel = "Alm. en México";
    this.prop.Type = 'checkBox';
    this.prop.Caption = "Si";
    this.prop.ControlSource = "vi_cap_tda.ave_tda";
    this.prop.Name = "ave_tda";

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