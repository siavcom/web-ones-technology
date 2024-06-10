//////////////////////////////////////////////
// Clase : pas_usu
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 01/Noviembre /2021
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { COMPONENT } from "@/classes/Component";

export class pas_usu extends COMPONENT {
  num_int: number;
  constructor() {
    super();
    this.Form = this.Parent;
    this.prop.BaseClass = "editText";
    this.prop.textLabel = "Contraseña";
    this.prop.Type = "password";
    this.prop.Capture = false;
    this.prop.TabIndex = 3;
    this.prop.Placeholder = "Password";
    this.style.width = "auto";
    this.inputStyle.width = "130px";
    this.prop.ErrorMessage = "Invalid password";

  }
  public async valid(Valid: boolean) {
    if (this.prop.Value.trim().length == 0) {
      return false
    }
    await this.Form.bt_aceptar.click();
    return true

  }
}
