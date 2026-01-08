//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// BaseClass : editBox
// Class : des_fam
// Description : Componente des_fam
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 29/05/25
// Update Date  :
/////////////////////////////////////////////
// import {editBox} from "@/classes/editBox";

import { COMPONENT } from "@/classes/Component";
//imports

export class des_fam extends COMPONENT {
  //public
  constructor() {
    super();
    this.prop.BaseClass = "editBox";
    this.prop.Caption = "Familia";
    this.prop.Type = 'text';
    //this.position.Left = 466;
    this.prop.Name = "des_fam";

    this.style.width = '400px';
    this.inputStyle.width = '124px';
    this.prop.Visible = false;


    //propiedades
  }
  // Evento   :GotFocus 
  // Objeto  :des_fam let m={}
  // Tipo   :Texbox 
  // Comentarios : 
  // calcula la mascara de entrada 

  override async gotFocus() {
    const m = {}   // inicializamos m
    let num_fam = this.Form.num_fam.prop.Value  // nÃºmero de familia 


    if (num_fam == 1) {  // obtenemos posiciones para generar la condiciÃ³n 

      Public.value.pri_cla = 1
      Public.value.ult_cla = at('-', Public.value.ima_pge)

    } else {
      Public.value.pri_cla = at('-', Public.value.ima_pge, num_fam - 1) + 1
      Public.value.ult_cla = at('-', Public.value.ima_pge, num_fam)
    } // End If 


    if (Public.value.ult_cla == 0) {
      Public.value.ult_cla = len(rTrim(Public.value.ima_pge)) + 1
    } // End If let m={}

    this.prop.InputMask = replicateString('!', Public.value.ult_cla - Public.value.pri_cla)
    return


  }   // Fin Procedure


  // Evento   :When 
  // Objeto  :des_fam 
  // Tipo   :Texbox 
  // Comentarios : 

  override async when() {
    const m = {}   // inicializamos m

    if (this.Form.sep_fam.prop.Value == 2) {
      return true

    } // End If 

    return false


  }   // Fin Procedure


  //metodo
}