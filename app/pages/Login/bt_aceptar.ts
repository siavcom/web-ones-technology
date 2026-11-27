/// ///////////////////////////////////////////
// Clase : bt_aceptar
// @author: Fernando Cuadras Angulo
// Creacion : Otubre/2021
// Ult.Mod  :
/// //////////////////////////////////////////

import { COMPONENT } from "@/classes/Component";
import { storeToRefs } from "pinia";

export class bt_aceptar extends IMGBUTTON {
  num_int = 0;

  constructor() {
    super();

    this.prop.BaseClass = "imgButton";
    // this.prop.Caption = "Enter/Entrar";
    this.style.width = "65px";
    //this.buttonStyle.width = "48px";
    this.imgButtonStyle.width = "64px";
    this.imgButtonStyle.height = "64px";

    //this.style.height = "64px";

    this.prop.TabIndex = 4;
    this.prop.Image = "/Iconos/svg/accept.svg";
  }

  /////////////////////////////////////////////////////////////////////
  // Click
  // Descripcion: Hace el click
  /////////////////////////////////////////////////////////////////

  public override async click() {
    const ThisForm = this.Form;

    const session = Session();
    const { id_con, url, pass, user, nom_emp } = storeToRefs(session); //pasa los elementos por referencia al Global

    const dat_emp = this.Form.emp_emp.dat_emp;
    let empresa = ThisForm.emp_emp.prop.Value;

    for (const nom_emp in dat_emp) {
      if (empresa == nom_emp) {
        url.value = dat_emp[nom_emp].url;
        break;
      }
    }
    // console.log('Empresa seleccionada:', this.Form.emp_emp.prop.Value, 'url:', url.value);

    id_con.value = "";
    pass.value = "";
    user.value = '';

    console.log("bt_aceptar click num_int=", this.num_int);
    this.num_int++;

    if (this.num_int >= 5) {
      alert("Exceeded the maximum number of attempts/ Exedió el maximo numero de intentos");
      //  window.close();
      //  return;
    } // numero maximo de intentos = 5


    let login = ThisForm.log_usu.prop.Value;
    const pos_arroba = login.indexOf("@", 0);

    console.log('1) login ========>>>>>>>', login, empresa)


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
    console.log('2) login ========>>>>>>>', login, empresa)

    if (empresa.length == 0) {
      ThisForm.emp_emp.prop.ErrorMessage = "Chose a company/Escoja una empresa";
      ThisForm.emp_emp.prop.Valid = false;
      ThisForm.emp_emp.prop.ShowError = true;
      return;
    }
    console.log('3) login ========>>>>>>>', login, empresa)

    if (login.length == 0) {
      ThisForm.log_usu.prop.ErrorMessage = "Enter username/Digite usuario";
      ThisForm.log_usu.prop.Valid = false;
      return;
    }

    ThisForm.pas_usu.prop.Value = ThisForm.pas_usu.prop.Value.trim();

    console.log('4) login ========>>>>>>>', login, empresa)

    if (
      !ThisForm.pas_usu.prop.Value ||
      ThisForm.pas_usu.prop.Value.length === 0
    ) {
      ThisForm.pas_usu.prop.Valid = false;

      return;
    }


    if (nom_emp.value != empresa)
      nom_emp.value = empresa;
    if (user.value != login)
      user.value = login;

    const password = ThisForm.pas_usu.prop.Value;
    //   ThisForm.pas_usu.prop.Value = ''

    pass.value = password  // We assign the password to the storage
    //console.clear
    console.log('Fin Salir Datos login ========>>>>>>>', id_con.value, nom_emp.value, user.value, pass.value)
    return;
  }
}
