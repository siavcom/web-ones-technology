//////////////////////////////////////////////
// Clase : log_usu
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  :
/////////////////////////////////////////////

//import { getCurrentInstance } from "vue";
//import VueSimpleAlert from "vue3-simple-alert"; // mensajes de alerta  npm i vue-simple-alert Vue.use(VueSimpleAlert);

import { COMPONENT } from "@/classes/Component";

export class log_usu extends COMPONENT {
  //name='log_usu'
  constructor() {
    super();
    this.Form = this.Parent;
    this.prop.BaseClass = "editText";
    //this.prop.Value = ''
    this.prop.ToolTipText = "user@company";
    this.prop.textLabel = "Username/Usuario";
    this.prop.Type = "text";
    this.prop.Placeholder = "usname@company/usuario@empresa";
    this.style.width = "auto";
    this.inputStyle.width = "200px";


    this.style.color = "black";
    this.style.fontWeight = "bold";
    this.style.fontSize = "15px";
    this.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'

    this.prop.TabIndex = 2;
    const session = Session();
    this.prop.Value = session.user;
  }

  override async when(): Promise<boolean> {

    return true;
  }
}