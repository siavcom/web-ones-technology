//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : header
// Class : c_dst_alm
// Description : Componente c_dst_alm
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 03/06/25
// Update Date  :
/////////////////////////////////////////////
// import {header} from "@/classes/header";

import { COLUMN } from "@/classes/Column";
//imports

export class c_dst_alm extends COLUMN {
  //public
  constructor() {
    super();


    this.prop.Type = 'text';
    this.prop.ControlSource = "vi_cap_alm.dst_alm";
    this.prop.Name = "c_dst_alm";
    this.prop.ColumnTextLabel = "Mensaje de advertencia en la captura";
    this.style.width = "300px";

    //propiedades
  } override async when() {
    this.prop.Valid = this.Parent.c_alm_tda.prop.Valid
    this.prop.ReadOnly = !this.prop.Valid
    return this.prop.Valid
  }   // Fin Procedure


  //metodo
}