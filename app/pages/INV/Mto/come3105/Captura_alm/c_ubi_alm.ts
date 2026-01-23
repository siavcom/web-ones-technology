//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : t_textbox
// @class : c_ubi_alm
// Description : Componente c_ubi_alm
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 03/06/25
// Update Date  :
/////////////////////////////////////////////
// import {t_textbox} from "@/classes/t_textbox";

import { COLUMN } from "@/classes/Column";
//imports

export class c_ubi_alm extends COLUMN {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "t_textbox";

    this.prop.ColumnTextLabel = "Ubicación en el almácen";
    this.prop.Name = "c_ubi_alm";
    this.prop.ControlSource = "vi_cap_alm.ubi_alm";
    this.style.width = "256px"

    //propiedades
  }

  override async when() {
    this.prop.Valid = this.Parent.c_alm_tda.prop.Valid
    this.prop.ReadOnly = !this.prop.Valid
    return this.prop.Valid
  }   // Fin Procedure

  //metodo
}