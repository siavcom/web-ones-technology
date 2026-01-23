//////////////////////////////////////////////
// This Form was generated automatically for web-ones-technology
// @baseClass  : Form
// Description : Forma de captura definicion de almacenes
// @author: El Fer Blocks (Fernando Cuadras)
// Creation : 15/05/25
// Update Date  :
/////////////////////////////////////////////

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { FORM } from "@/classes/Form";

import { tab_cap } from './tab_cap';


export class ThisForm extends FORM {
  public tab_cap = new tab_cap()
  constructor() {
    super();
    this.prop.Name = 'Pages/come3104';
    this.prop.Caption = "Definición de almacenes";
    this.prop.Name = "COME3104";
  }


  override async init() {
    // open databasedata &bas_dat shared  

    //    await useNodata('vi_lla1_nom')// use vi_lla1_nom vi_lla1_nom nodata  // abre vista de clientes y proveedores 


  }   // Fin Procedure


  //metodo
}