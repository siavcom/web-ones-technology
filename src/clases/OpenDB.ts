/// ///////////////////////////////////////////
// Clase : OpenDataBase
// Descripcion : Conecta con un servidor node que esta sirviendo los servicios de la base de datos
// Author : Fernando Cuadras Angulo
// Creacion : Octubre/2021
// Ult.Mod  : Enero/18/2023
//
/// //////////////////////////////////////////
// import {inject } from "vue";
// import router from "@/router";
//import Vue  from 'vue'
import axios from 'axios'
//import store from '@/stores/index'
import { Session } from '@/stores/currentSession'
import dat_emp from '@/static/empresas/datos.json'
const session = Session()

//const session = Session(store())

export class OpenDb {
  // propiedades de las clases
  url: string
  nom_emp: string
  user: string
  pass: string
  id_con: string
  dialect:string=''

  // Inicializa la conexion
  constructor() {

    this.url = session.url
    this.nom_emp = session.nom_emp
    this.user = session.user
    this.pass = ''
    this.id_con = ''
   // this.dialect=''
    /*
        localsession.setItem('id_con','')
        localsession.setItem('nom_emp','')
        localsession.setItem('log_usu','')
        localsession.setItem('url','')
    */
  } // Fin constructor

  /// /////////////  open  ///////////////////
  // Hace la conexion al servidor NODEJS que
  // comunica con el servidor de SQL
  /// ////////////////////////////////////////
  open = async () => {
    
    let nom_emp: any = this.nom_emp
    let user: any = this.user
    
    const pass: any = this.pass
    //  let url: any = this.url


    const router = useRouter()
    if (nom_emp.length === 0 || user.length === 0 || pass.length === 0) {

      router.push('/Login')
    }
    try {
      this.url = dat_emp[nom_emp].url // obtenemos el url del servidor node
    }

    catch (error) {
      console.warn('No existe empresa ', nom_emp)
      MessageBox('No esta definida la empresa :' + nom_emp, 16, 'SQL Error ')
      //$Swal.fire('Error SQL' + error)
      return ''
    }


    session.id_con = ''
    session.url = this.url
    session.nom_emp = nom_emp
    session.user = user
    session.menu = []

    const def_con = { nom_emp, user, pass }
    const json = JSON.stringify(def_con)
    // console.log('Conexion Axios==>>',this.url,json)
    try {
      const response = await axios.get(
        this.url + 'login?json=' + json
        // { headers: { "Content-type": "application/json" } }
      )

      this.id_con = response.data.id // asignamos a su conexion de base de datos
      this.dialect= response.data.dialect
      console.log("ID de conexion=", this.id_con,'dialect=',this.dialect);

      /*session.setItem('id_con', this.id_con)
      session.setItem('nom_emp', this.nom_emp)
      session.setItem('user', this.user)
      session.setItem('url', this.url) */

      if (await this.leeMenu()) {

        session.update(this.id_con, this.user, this.nom_emp, this.url,this.dialect)
        return this.id_con
      }
    } catch (error) {

      console.warn('Error llamada Axios', error)
      //const { $MessageBox } = useNuxtApp()

      if (error === 'Error: Network Error') {
        console.log('OpenDb Error SQL===>', error)
        MessageBox(error, 16, 'SQL Error ')
        //$Swal.fire('Error SQL' + error)
        return ''
      }

      // console.log('OpenDb error ===>',error.response.status.toString() + " " + error.response.statusText)
      if (error )
          MessageBox(error.response.status.toString() + ' ' + error.response.statusText, 16, 'Data SQL Error')
      else
          MessageBox('Back-end comunication error', 16, 'ERROR')

      
      return ''
    } // Fin de Catch
  }

  /// /////////////  open  ///////////////////
  // Hace la conexion al servidor NODEJS que
  // comunica con el servidor de SQL
  /// ////////////////////////////////////////
  ver_con = async () => {
    //  sin no se ha inicilizado la conexion aborta todo
    if (!session.id_con || session.id_con === '') {
      const router = useRouter()
      router.push('/Login')
      return
    }

    // va hacer una consulta para ver si sigue activa la conexion
    const id_con: any = session.id_con

    const nom_emp: any = session.nom_emp
    const url = dat_emp[nom_emp].url // obtenemos el url del servidor node

    const dat_vis = {
      id_con,
      tip_llamada: 'SQLEXEC',
      // tok_aut: this.tok_aut,
      query: 'SELECT 1+1 AS result'

    }
    try {
      const response = await axios.post(url + 'sql', dat_vis, {
        headers: { 'Content-type': 'application/json' }
      })
    } catch (error) {
      // si no es un error de desconexion
      if (error.response.status.toString() != 401) {
        return true
      }
      return false
    }
    return true
  }

  /// ////////////////////////////////
  // lee el Menu de la empresa
  // comunica con el servidor de SQL
  /// ////////////////////////////////////////
  public leeMenu = async () => {
    //console.log('======leeMenu=====')
    //  sin no se ha inicilizado la conexion aborta todo

    if (this.id_con === '') {
      const router = useRouter()
      router.push('/Login')
      return
    }

    // const nom_emp :any= Storage.getItem("nom_emp");

    const url = this.url // obtenemos el url del servidor node

    const dat_vis = {
      id_con: this.id_con,
      tip_llamada: 'SQLEXEC',
      // tok_aut: this.tok_aut,
      query: 'SELECT * from man_comeprg order by NUM_PRG,SIS_SIS,TPR_PRG'

    }

    try {
      const response = await axios.post(url + 'sql', dat_vis, {
        headers: { 'Content-type': 'application/json' }
      })
      
      var data= []
      
      for (let i = 0; i < response.data.length; i++) {

        const registro={}
        for (const nom_cam in response.data[i]) {
          registro[nom_cam.toLowerCase()] = response.data[i][nom_cam]
        }
        data.push(registro)

        const pre = data[i].tpr_prg === 'S' ? '' : '-'
        let des_prg = data[i].des_prg.replace(String.raw`\<`, '')
        des_prg = des_prg == null ? '' : des_prg
        data[i].des_prg = pre + des_prg


        /*
        const pre = response.data[i].tpr_prg === 'S' ? '' : '-'
         let des_prg= response.data[i].des_prg.replace(String.raw`\<`, '')
         des_prg= des_prg==null ?'': des_prg
         response.data[i].des_prg = pre + des_prg
          */
        // response.data[i].des_prg = pre + response.data[i].des_prg.replace(String.raw`\<`, '')
      }
      //const menu = JSON.stringify(response.data)
      const menu = (data)

      session.updateMenu(menu) // guardamos el menu en la sesion local
      return true
    } catch (error) {
      console.error(error)
      MessageBox(error, 16, 'Back-End error')
      // si no es un error de desconexion
      if (error.response.status.toString() != 401) {
        return true
      }
      return false
    }
    return true
  }
}
