//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : t_textbox
// Class : c_max_alm
// Description : Componente c_max_alm
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 03/06/25
// Update Date  :
/////////////////////////////////////////////
// import {t_textbox} from "@/classes/t_textbox";

import { COLUMN } from "@/classes/Column";
//imports

export class c_max_alm extends COLUMN {
  //public
  constructor() {
    super();
    this.prop.Type = "number";
    this.prop.ColumnTextLabel = "Máximo";
    this.prop.Name = "c_max_alm";
    this.prop.ControlSource = "vi_cap_alm.max_alm";
    this.prop.Decimals = 3
    this.prop.MaxLength = 12
    this.prop.Min = '0.01'
    this.style.width = '108px';


    //propiedades
  }
  // Evento   :When 
  // Objeto  :max_alm 
  // Tipo   :TextBox 
  // Comentarios : prop.Valid==true

  override async when() {
    this.prop.Valid = this.Parent.c_alm_tda.prop.Valid
    this.prop.ReadOnly = !this.prop.Valid
    return this.prop.Valid
  }   // Fin Procedure

  //metodo
}