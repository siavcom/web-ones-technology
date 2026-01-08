//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : header
// Class : c_cla_isu
// Description : Componente c_cla_isu
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 03/06/25
// Update Date  :
/////////////////////////////////////////////
// import {header} from "@/classes/header";

import { COLUMN } from '@/classes/Column'
import { help } from '@/classes/Siavcom/help/cla_isu/help'
import { des_isu } from './des_isu'
//imports

export class c_cla_isu extends COLUMN {
  public des_isu = new des_isu()

  //public
  constructor() {
    super();

    this.prop.Type = 'text';
    this.prop.ControlSource = "vi_cap_alm.cla_isu";
    this.prop.Name = "c_cla_isu";
    this.prop.ColumnTextLabel = "Clave";
    this.prop.Help = true;
    this.inputStyle.width = "128px"// "218px" // Son 30 puntos del icono de ayuda
    this.style.width = "max-content"
    this.asignaRecno()
    //propiedades
  }

  //metodo
}
