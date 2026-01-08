//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editBox
// Class : cla_fam
// Description : Componente cla_fam
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COLUMN } from "@/classes/Column";
//imports

export class cla_fam extends COLUMN {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "editBox";
    this.prop.ColumnTextLabel = "Clave";
    this.prop.ControlSource = "vi_cap_fam.cla_fam";
    this.prop.Name = "cla_fam";
    this.prop.Capture = true;
    this.prop.updateKey = true;
    this.prop.ErrorMessage = 'Familia repetida/inválida';
    //propiedades
  }

  // Evento   : Valid 
  // Objeto  : Text 
  // Tipo   : Cuadro de texto 
  // Pertenece  : Grid 
  // Comentarios : Es la validaciÃ³n de la llave principal 
  override async valid_old() {
    const res = await super.valid()
    return res


  }   // Fin Procedure

  //metodo
}