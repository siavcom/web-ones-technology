//////////////////////////////////////////////
// Clase : pas_usu
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 01/Noviembre /2021
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { COMPONENT } from "@/classes/Component";

export class pas_usu extends COMPONENT {
  num_int: number = 0;
  constructor() {
    super();
    this.Form = this.Parent;
    this.prop.BaseClass = "editText";
    this.prop.textLabel = "Password/Contraseña";
    this.prop.Type = "password";
    this.prop.Capture = false;
    this.prop.TabIndex = 3;
    this.prop.Placeholder = "Password/Contraseña";
    this.style.width = "auto";
    this.inputStyle.width = "230px";
    this.prop.ErrorMessage = "Invalid password/Contraseña invalida";
    this.style.color = "black";
    this.style.fontWeight = "bold";
    this.style.fontSize = "15px";
    this.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'

  }
  public override async valid(Valid: boolean) {
    console.log('pas_usu This.form=')
    console.log(this.Form)
    if (this.prop.Value.trim().length == 0) {
      return false
    }

    await this.Form.bt_aceptar.click();
    return true

  }
}
