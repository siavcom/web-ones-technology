/// ///////////////////////////////////////////
// Clase : bt_aceptar
// Author : Fernando Cuadras Angulo
// Creacion : Otubre/2021
// Ult.Mod  :
/// //////////////////////////////////////////
// import router from '@/router'


//import { OpenDb } from '@/classes/OpenDB'
import { COMPONENT } from '@/classes/Component'
//import { Session } from '@/stores/currentSession'
import { storeToRefs } from 'pinia'
/*
export default {
  useAsyncData({ $pinia }) {
    const session = Session($pinia)
  },
}
*/


export class bt_aceptar extends COMPONENT {

 //session=this.store
  num_int = 0
  //OpenDb = new OpenDb()

  // OpenDb = new OpenDb('siavcom.com.mx:38080/', 'Demo', 'sa', '*****')
  constructor() {
    super()
  
    this.prop.BaseClass = 'imgButton'
    this.prop.Value = 'Entrar'
    this.style.width = '30%'
   
    this.prop.Image = '/Iconos/svg/bx-check-circle.svg'
    //  this.prop.Position='footer'
  }

  //  public click = async () => {

  public async Click() {

    this.num_int++

    if (this.num_int == 5) {
      window.close()
      return
    } // numero maximo de intentos = 5


// const { data:stats } = await useAsyncData( 'stats', () => $fetch( config.API_BASE_URL+'/stats') );


  
   const session = await Session()

//   const {data, pending, error, refresh } = await useAsyncData('Session',
//      ()=>Session(pinia))

    //const session = Session(pinia)
    // Podiamos poner todas las variables de memoria globales
    const { id_con, pass, user, nom_emp } = storeToRefs(session)  //pasa los elementos por referencia al Global

    const ThisForm = this.Form
    let login = ThisForm.log_usu.prop.Value
    let empresa = ThisForm.emp_emp.prop.Value
    const pos_arroba = login.indexOf('@', 0)

    if (login.length == pos_arroba + 1) {
      ThisForm.log_usu.prop.MessageError = 'usuario@empresa'
      ThisForm.log_usu.prop.Valid = false
      ThisForm.log_usu.prop.ShowError = true
      return false
    }

    if (pos_arroba > 0) {
      const len = login.length - pos_arroba - 1
      empresa = login.substr(-len)
      login = login.substr(0, pos_arroba)

    }


    if (empresa.length == 0) {
      ThisForm.emp_emp.prop.MessageError = 'Escoja una empresa'
      ThisForm.emp_emp.prop.Valid = false
      ThisForm.emp_emp.prop.ShowError = true
      return false
    }

    if (login.length == 0) {
      ThisForm.log_usu.prop.MessageError = 'Digite usuario'
      ThisForm.log_usu.prop.Valid = false
      ThisForm.log_usu.prop.ShowError = true
      return false
    }

    if (!ThisForm.pas_usu.prop.Value || ThisForm.pas_usu.prop.Value.length === 0) {
      ThisForm.pas_usu.prop.MessageError = 'Digite contraseña'
      ThisForm.pas_usu.prop.Valid = false
      ThisForm.pas_usu.prop.ShowError = true
      return false
    }
    id_con.value=''
    nom_emp.value = empresa
    user.value = login
    pass.value = ThisForm.pas_usu.prop.Value
    //console.log('Datos login ========>>>>>>>',id_con.value,nom_emp.value,user.value,pass.value)

  }
}
