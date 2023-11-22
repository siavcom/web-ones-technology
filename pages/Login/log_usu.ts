//////////////////////////////////////////////
// Clase : log_usu
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
//import { getCurrentInstance } from "vue";
//import VueSimpleAlert from "vue3-simple-alert"; // mensajes de alerta  npm i vue-simple-alert Vue.use(VueSimpleAlert);

import { COMPONENT } from '@/classes/Component'

export class log_usu extends COMPONENT {

  //name='log_usu'
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.Form=this.Parent
    this.prop.BaseClass = 'editText'
    //this.prop.Value = ''
    this.prop.ToolTipText='user@company'
    this.prop.textLabel = "Usuario";
    this.prop.Type = "text";
    this.style.width = 'auto'
    this.prop.componentStyle.width ='150px'
    this.style.zIndex=1  
    this.style.tabindex=2 
    const session = Session()
    this.prop.Value=session.user
 
  }
  
  //////////////////////////
  // KeyPress
  // Descripcion: Cada tecla que se presiona en el input
  //////////////////////////

  public keyPress = async ($event) => {
    //console.log('KeyPress===>',super.keyPress($event))
   // const key = $event.charCode // Key pressed
  }


  // public click() {
  public click = async () => {
    const m = {};
  }; // fin metodo click
}
