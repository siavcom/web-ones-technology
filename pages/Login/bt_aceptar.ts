/// ///////////////////////////////////////////
// Clase : bt_aceptar
// Author : Fernando Cuadras Angulo
// Creacion : Otubre/2021
// Ult.Mod  :
/// //////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
import { storeToRefs } from "pinia";

export class bt_aceptar extends COMPONENT {
  num_int = 0;

  constructor() {
    super();

    this.prop.BaseClass = "imgButton";
    // this.prop.Caption = "Enter/Entrar";
    this.style.width = "30%";
    this.prop.TabIndex = 4;
    this.prop.Image = "/Iconos/svg/accept.svg";
  }

  /////////////////////////////////////////////////////////////////////
  // Click
  // Descripcion: Hace el click
  /////////////////////////////////////////////////////////////////

  public override async click() {

    console.log("bt_aceptar click num_int=", this.num_int);
    this.num_int++;

    if (this.num_int >= 5) {
      alert("Exceeded the maximum number of attempts/ Exedió el maximo numero de intentos");
      window.close();
      return;
    } // numero maximo de intentos = 5

    const ThisForm = this.Form;
    let login = ThisForm.log_usu.prop.Value;
    let empresa = ThisForm.emp_emp.prop.Value;
    const pos_arroba = login.indexOf("@", 0);

    if (login.length == pos_arroba + 1) {
      ThisForm.log_usu.prop.ErrorMessage = "Use : username@company/usuario@empresa";
      ThisForm.log_usu.prop.Valid = false;
      ThisForm.log_usu.prop.ShowError = true;
      return;
    }

    if (pos_arroba > 0) {
      const len = login.length - pos_arroba - 1;
      empresa = login.substr(-len);
      // login = login.substr(0, pos_arroba);
    }

    if (empresa.length == 0) {
      ThisForm.emp_emp.prop.ErrorMessage = "Chose a company/Escoja una empresa";
      ThisForm.emp_emp.prop.Valid = false;
      ThisForm.emp_emp.prop.ShowError = true;
      return;
    }

    if (login.length == 0) {
      ThisForm.log_usu.prop.ErrorMessage = "Enter username/Digite usuario";
      ThisForm.log_usu.prop.Valid = false;
      return;
    }

    ThisForm.pas_usu.prop.Value = ThisForm.pas_usu.prop.Value.trim();

    if (
      !ThisForm.pas_usu.prop.Value ||
      ThisForm.pas_usu.prop.Value.length === 0
    ) {
      ThisForm.pas_usu.prop.Valid = false;

      return;
    }

    const session = Session();
    const { id_con, pass, user, nom_emp } = storeToRefs(session); //pasa los elementos por referencia al Global

    id_con.value = "";
    pass.value = "";

    if (nom_emp.value != empresa)
      nom_emp.value = empresa;
    if (user.value != login)
      user.value = login;

    const password = ThisForm.pas_usu.prop.Value;
    //   ThisForm.pas_usu.prop.Value = ''

    pass.value = password  // We assign the password to the storage

    //console.log('Datos login ========>>>>>>>',id_con.value,nom_emp.value,user.value,pass.value)
    return;
  }
}
