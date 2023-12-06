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
  textLabel = "";
  constructor() {
    super();
    this.prop.Capture = true;
    this.prop.Valid = false;
    this.prop.Position = "main";
    this.style.width = "85%";
    this.style.height = "95%";
    // Segun Vfp
    //    this.header.BaseClass = 'Header'
    //    this.header.Name = 'header'
    //    this.componente.BaseClass = 'Component'
    //    this.componente.Name = 'component'
  }
  async init() {
    this.prop.componentStyle.width = "95%";
    //this.prop.componentStyle.maxWidth=this.style.width
  }

  async valid() {
    return this.Parent.validColumn(this.Name);
  }
}
