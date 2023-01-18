//////////////////////////////////////////////
// Clase : pas_usu
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : Noviembre/2021
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
//import { getCurrentInstance } from "vue";


import { EMP_EMP } from './emp_emp'
import { LOG_USU } from './log_usu'
import { PAS_USU } from './pas_usu'
import { BT_ACEPTAR } from './bt_aceptar'
import {FORM} from "@/classes/Form"
import { Session } from '@/stores/currentSession'
const session = Session()

export class form extends FORM {
  public emp_emp=new EMP_EMP()
  public log_usu=new LOG_USU()
  public pas_usu=new PAS_USU()
  public bt_aceptar=new BT_ACEPTAR()

  name = 'login'
  classBase = 'form de VFP'

  /////////////////////////////////////////////////////////////////////
  // init
  // Descripcion: init del componente
  /////////////////////////////////////////////////////////////////
  public async init() {

    console.log('login init antes',session.nom_emp,session.user)
    this.emp_emp.prop.Value=session.nom_emp
    this.log_usu.prop.Value=session.user
    console.log('login init ',this.emp_emp.prop.Value,this.log_usu.prop.Value)
  }


}