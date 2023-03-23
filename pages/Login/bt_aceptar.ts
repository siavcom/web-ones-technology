/// ///////////////////////////////////////////
// Clase : bt_aceptar
// Author : Fernando Cuadras Angulo
// Creacion : Otubre/2021
// Ult.Mod  :
/// //////////////////////////////////////////
// import router from '@/router'


import { OpenDb } from '@/classes/OpenDB'
import { COMPONENT } from '@/classes/Component'

// import dat_emp from '@/static/empresas/datos.json'
// '@/static/empresas/datos.json' // Empresas del menu

export class bt_aceptar extends COMPONENT {
  num_int = 0
  OpenDb = new OpenDb()

  // OpenDb = new OpenDb('siavcom.com.mx:38080/', 'Demo', 'sa', '*****')
  constructor () {
    super()
    //  this.name = 'bt_aceptar'
    this.prop.BaseClass = 'imgButton'
    this.prop.Value = 'Entrar'
    this.style.width = '30%'
    // this.prop.Image = "/Iconos/Accept.png";
    this.prop.Image = '/Iconos/svg/bx-check-circle.svg'
  //  this.prop.Position='footer'
  }

  //  public click = async () => {

  public async Click () {
   // console.log('Entro a click=====>',this.Form.emp_emp.prop.Value, this.Form.log_usu.prop.Value, this.Form.pas_usu.prop.Value)

    const ThisForm = this.Form
    let login=ThisForm.log_usu.prop.Value
    let empresa=ThisForm.emp_emp.prop.Value
    const pos_arroba=login.indexOf('@',0) 
    
    if (login.length == pos_arroba+1 ){
      ThisForm.log_usu.prop.MessageError = 'usuario@empresa'
      ThisForm.log_usu.prop.Valid = false
      ThisForm.log_usu.prop.ShowError = true
      return false
    }

    if (pos_arroba>0){
        const len=login.length-pos_arroba-1
        empresa=login.substr(-len)
        login=login.substr(0,pos_arroba)
 
    }
       

    if (empresa.length == 0) {
      ThisForm.emp_emp.prop.MessageError = 'Escoja una empresa'
      ThisForm.emp_emp.prop.Valid = false
      ThisForm.emp_emp.prop.ShowError = true
      return false
    }

    if ( login.length == 0) {
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

    const db = this.OpenDb

    db.nom_emp = empresa
    db.user = login
    // db.url = dat_emp[db.nom_emp].url // obtenemos el url del servidor node
    db.pass = ThisForm.pas_usu.prop.Value

    const id_con = await db.open()

    if (id_con.length < 4) {
      this.num_int++
      if (this.num_int === 5) { window.close() } // numero maximo de intentos = 5
      return
    }
    
    this.num_int = 0 // reinicializamos los numero de intentos
    // guardamos el id de conexión

    // asigna nombre de la empresa
    // const nom_sis = dat_emp[db.nom_emp].nom_sis // ThisForm.nom_sis.replace(':','')
    // const path = dat_emp[db.nom_emp].path
    // console.log('Empresas json===>',dat_emp[db.nom_emp])

    /*
    router.addRoute(
    {

      //   path: "/Login:nom_sis/:url_srv",  //    /:url_srv http://Login
         path: "/come9101",  //    /:url_srv http://Login   path (requerido)
         name: "come9101", // Nombre (opcional)
         component: () =>
         import("@/views/come9101/Main.vue"),  //Componente a llamar segun su import Login from "@/views/Login/Form.vue"
         props: true
       }
    )
    */
    //        router.push({ name: nom_prg, params: { id_con ,nom_prg} })
    
    //await db.leeMenu() // lee menu de programas

    ThisForm.prop.Login = true // apaga el teleport para cerrar ventana login
   
    // router.back()
    // router.forward()
    // router.go()
    const router = useRouter()
    router.push('/')

    // window.history.back()
    
    /*
    if (path) {
      router.push(path)
    } else {
                               // genera todas las rutas segun su menu
      router.go('-1) // faltaria pasar todo el menu
    }
    this.Form.prop.Login = true
*/
  }
}
