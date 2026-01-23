// ---------------------------------------------------------------------------------------------- 
//              Siavcom Software S. de R.L. de C.V. 
// ---------------------------------------------------------------------------------------------- 
// Autor     : Ing. Fernando Cuadras Angulo 
// Sistema   : Siavcom            Version : 6.0  Windows 
// Programa  : DefiniciÃ³n de Familias       Mnemo   : come3103.scx 
// Ult. mod. : Fernando Cuadras         Fecha   : 30/Agosto/99 
// Evento  : Init 
// Objeto  : come3103 
// Tipo   : Form 
// ---------------------------------------------------------------------------------------------- 

//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : captureForm
// @class : num_fam
// Description : Forma de captura
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////

import { FORM } from "@/classes/Form";
import { captura_fami } from './captura_fami';
import { num_fam } from './num_fam';
import { bt_aceptar } from './bt_aceptar'

export class ThisForm extends FORM {
  public num_fam = new num_fam()
  public bt_aceptar = new bt_aceptar()
  public captura_fami = new captura_fami()
  constructor() {
    super();
    this.prop.Name = 'Pages/come3103';
    this.prop.Caption = "Definición de familias";
    this.prop.Name = "COME3103";
  }

  //metodo
}