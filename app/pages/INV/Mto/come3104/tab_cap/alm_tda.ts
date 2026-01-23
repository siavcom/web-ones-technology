//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : editBox
// @class : alm_tda
// Description : Componente alm_tda
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COLUMN } from "@/classes/Column";
//imports

export class alm_tda extends COLUMN {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "editBox";
    this.prop.ColumnTextLabel = "Almacen";
    this.prop.ControlSource = "vi_cap_tda.alm_tda";
    this.prop.MaxLength = 3
    this.prop.updateKey = true
    this.style.width = "100px";
    //propiedades
  }

  //metodo
}