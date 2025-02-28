//////////////////////////////////////////////
// Clase : Celda de un gridd
// Author : Fernando Cuadras Angulo
// Creacion : Noviembre/2021
// Ult.Mod  : Junio/2023
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { COMPONENT } from "@/classes/Component";
//import { nextTick } from 'vue'
//import VueSimpleAlert from 'vue3-simple-alert'

export class COLUMN extends COMPONENT {
  //  constructor(parent: Record<string, never>) {

  // Segun Vfp
  //componente = new COMPONENT
  //header = new COMPONENT

  Order = 1;
  BaseClass = "Column";
  // textLabel = "";
  constructor() {
    super();
    this.prop.Capture = true;
    this.prop.Valid = false;
    this.prop.Position = "main";
    this.style.width = "99%";
    this.style.height = "auto"; //99%";
    this.inputStyle.width = "96%";
    this.inputStyle.height = "auto";  // auto para que en los componentes como json,
    // se ajusten a lo  alto

    // Segun Vfp
    //    this.header.BaseClass = 'Header'
    //    this.header.Name = 'header'
    //    this.componente.BaseClass = 'Component'
    //    this.componente.Name = 'component'
  }

  override async valid() {
    return await this.Parent.validColumn(this.Name);
  }
}
