//////////////////////////////////////////////
// Clase : pas_usu
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : Noviembre/2021
/////////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";  // Base class
import { emp_emp } from "./emp_emp"; // Company combobox
import { log_usu } from "./log_usu"; // User input text
import { pas_usu } from "./pas_usu"; // Password input text
import { bt_aceptar } from "./bt_aceptar";  // Accept button

export class form extends COMPONENT {
  public emp_emp = new emp_emp("emp_emp");
  public log_usu = new log_usu();
  public pas_usu = new pas_usu();
  public bt_aceptar = new bt_aceptar();

  Name = "Login";
  Status = "I";
  eventos = [];
  constructor(Name: string) {
    super();
    this.style.color = "black";
    this.style.fontWeight = "bold";
    this.style.fontSize = "15px";
  }


}
