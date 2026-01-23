//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : header
// @class : c_cpe_alm
// Description : Componente c_cpe_alm
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 03/06/25
// Update Date  :
/////////////////////////////////////////////
// import {header} from "@/classes/header";

import { COLUMN } from "@/classes/Column";
//imports

export class c_cpe_alm extends COLUMN {
  //public
  constructor() {
    super();

    this.prop.Type = 'number';
    this.prop.ControlSource = "vi_cap_alm.cpe_alm";
    this.prop.InputMask = "9,999,999";
    this.prop.Decimals = Public.value.dci_pge
    this.prop.MaxLength = 12
    this.prop.Min = '0.0'

    this.prop.ColumnTextLabel = "Cantidad  a pedir";


    //propiedades
  }

  // Evento   :When 
  // Objeto  :cpe_alm 
  // Tipo   :TextBox 
  // Comentarios : prop.Valid==true

  override async when() {
    this.Parent.c_alm_tda.prop.Valid = true
    this.prop.Valid = this.Parent.c_alm_tda.prop.Valid

    console.log('c_cpe_alm.when', this.prop.Valid)
    this.prop.ReadOnly = !this.prop.Valid
    return this.prop.Valid
  }   // Fin Procedure
  //metodo
}