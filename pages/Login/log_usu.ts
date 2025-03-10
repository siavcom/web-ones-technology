//////////////////////////////////////////////
// Clase : log_usu
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  :
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
//import { getCurrentInstance } from "vue";
//import VueSimpleAlert from "vue3-simple-alert"; // mensajes de alerta  npm i vue-simple-alert Vue.use(VueSimpleAlert);

import { COMPONENT } from "@/classes/Component";

export class log_usu extends COMPONENT {
  //name='log_usu'
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super();
    this.Form = this.Parent;
    this.prop.BaseClass = "editText";
    //this.prop.Value = ''
    this.prop.ToolTipText = "user@company";
    this.prop.textLabel = "Usuario";
    this.prop.Type = "text";
    this.prop.Placeholder = "User";
    this.style.width = "auto";
    this.inputStyle.width = "150px";

    this.prop.TabIndex = 2;
    const session = Session();
    this.prop.Value = session.user;
  }

override async when (): Promise<boolean> {
  
  return true;
}
}