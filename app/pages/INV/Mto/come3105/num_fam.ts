//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editBox
// Class : num_fam
// Description : Componente num_fam
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 29/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COMPONENT } from "@/classes/Component";
//imports

export class num_fam extends COMPONENT {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "editBox";
    this.prop.Caption = "Segmento de familia";
    this.prop.Type = 'spinner';
    this.prop.Min = 1;
    this.prop.Max = 5;
    this.prop.Name = "num_fam";
    this.prop.Visible = false;

    //propiedades
  }
  // Evento   :Valid 
  // Objeto  :num_fam let m={}
  // Tipo   :Spinner 
  // Comentarios : 

  override async valid() {
    let m = {}   // inicializamos m
    m.num_fam = this.prop.Value
    await select('vi_cap_fam')

    const data = await use('vi_cap_fam', m) // use vi_cap_fam vi_cap_fam
    return true
  }   // Fin Procedure

  //metodo
}