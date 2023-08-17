//////////////////////////////////////////////
// Clase : pas_usu
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : Noviembre/2021
/////////////////////////////////////////////
/* e_slint-disable @typescript-eslint/no-non-null-assertion */
//import { getCurrentInstance } from "vue";
import {COMPONENT} from "@/classes/Component"
import { emp_emp } from './emp_emp'
import { log_usu } from './log_usu'
import { pas_usu } from './pas_usu'
import { bt_aceptar } from './bt_aceptar'
import { Session } from '@/stores/currentSession'
// const session = Session()
 
export class form extends COMPONENT {
  public emp_emp=new emp_emp('emp_emp')
  public log_usu=new log_usu()
  public pas_usu=new pas_usu()
  public bt_aceptar=new bt_aceptar()

  Name = 'login'
 // classBase = 'form de VFP'

  /////////////////////////////////////////////////////////////////////
  // init
  // Descripcion: init del componente
  /////////////////////////////////////////////////////////////////
  public async init() {


    const session = Session()
   // console.log('login init antes',session.id_con,session.nom_emp,session.user)
    this.emp_emp.prop.Value=session.nom_emp
    this.log_usu.prop.Value=session.user
    console.log('login init emp_emp,log_usu',this.emp_emp.prop.Value,this.log_usu.prop.Value)
    this.emp_emp.prop.Value=session.nom_emp
  }

}