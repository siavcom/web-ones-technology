// index.ts
/* en nuxt.config.ts (dio error al arrancar)
modules: [
  '@pinia/nuxt'
  
,
        {
            autoImports: [
              // automatically imports `defineStore`
              'defineStore' // import { defineStore } from 'pinia'
            ]
          }
        ]
*/

//import { defineStore, acceptHMRUpdate } from 'pinia'
import { acceptHMRUpdate } from 'pinia'

//import {watch} from 'vue'
import axios from 'axios'
import dat_emp from '@/static/empresas/datos.json'
//import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
//import store from '../stores/index'
/*

// make sure to pass.value the right store definition, `Session` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(Session, import.meta.hot))
}



*/

export const Session = defineStore('currentSession', () => {
  const id_con = ref('')
  const user = ref('')
  const pass = ref('********')
  const nom_emp = ref('')
  const url = ref('')
  const dialect = ref('Postgres')
  const fpo_pge = ref(new Date().toISOString().substring(0, 10))
  const logoEmp = ref('')
  const fileLogoEmp = ref(null)
  const menu = ref([])

  
  // actions: { // aqui van todas las funciones que uno defina separadas por coma


  /// /////////////  open  ///////////////////
  // Hace la conexion al servidor NODEJS que
  // comunica con el servidor de SQL
  /// ////////////////////////////////////////
  async function open(password: string) {

    //  let url: any = this.url
    const router = useRouter()
    if (nom_emp.value.length == 0 || user.value.length == 0 || password.length == 0) {
      router.push('/Login')
      return
    }

    try {
      url.value = dat_emp[nom_emp.value].url // obtenemos el url del servidor node
      logoEmp.value = dat_emp[nom_emp.value].logoEmp
    }

    catch (error) {
      console.warn('No existe empresa ', nom_emp.value)
      MessageBox('No esta definida la empresa :' + nom_emp.value, 16, 'SQL Error ')

    }
    let sw_con=false 
    if (id_con.value.length>8)
       sw_con=true

  
    const def_con = {
      nom_emp: nom_emp.value,
      user: user.value,
      pass: password
    }
    const json = JSON.stringify(def_con)
    console.log('Conexion Axios==>>', url.value, json)
    try {
      const response = await axios.get(
        url.value + 'login?json=' + json
        // { headers: { "Content-type": "application/json" } }
      )
      if (response.data.fpo_pge)
        fpo_pge.value = response.data.fpo_pge

      dialect.value = response.data.dialect
      id_con.value = response.data.id // asignamos a su conexion de base de datos
      //fileLogoEmp=response.data.fileLogoEmp

      // logoEmp.value='/img/Logo_Empresa.bmp'

      console.log("Pinia ID de conexion=", id_con.value, 'dialect', dialect.value);
      if (sw_con)
         return 
      // leeMenu()
      
      window.history.back(); // regresa forma anterior
      //     const router = useRouter()
      //     router.push('/')


    } catch (error) {

      console.warn('Error llamada Axios', error)
      //const { $MessageBox } = useNuxtApp()

      if (error == 'Error: Network Error') {
        console.log('OpenDb Error SQL===>', error)
        MessageBox(error, 16, 'SQL Error ')
        //$Swal.fire('Error SQL' + error)

      }

      // console.log('OpenDb error ===>',error.response.status.toString() + " " + error.response.statusText)
      if (error) {
        let menError = ''
        if (error.response.statusText)
          menError = error.response.statusText
        else
          menError = error.response

        MessageBox(menError, 16, 'ERROR')
        console.log('Pinia error ====>>>>>>', error.response)
        //  MessageBox(error.response.status.toString() + ' ' + error.response.statusText, 16, 'Data SQL Error')
      }
      else
        MessageBox('Back-end comunication error', 16, 'ERROR')



    } // Fin de Catch
  }

  /// ////////////////////////////////
  // lee el Menu de la empresa
  // comunica con el servidor de SQL
  /// ////////////////////////////////////////
  async function leeMenu() {
    //  sin no se ha inicilizado la conexion aborta todo

    if (id_con.value == '') {
      const router = useRouter()
      router.push('/Login')
      return
    }

    // const nom_emp.value :any= Storage.getItem("nom_emp.value");

    // const url = url // obtenemos el url del servidor node

    const dat_vis = {
      id_con: id_con.value,
      tip_llamada: 'SQLEXEC',
      // tok_aut: this.tok_aut,
      query: 'SELECT * from vcomeprg order by NUM_PRG,SIS_SIS,TPR_PRG'

    }

    try {
      const response = await axios.post(url.value + 'sql', dat_vis, {
        headers: { 'Content-type': 'application/json' }
      })

      var data = []

      for (let i = 0; i < response.data.length; i++) {

        const registro = {}
        for (const nom_cam in response.data[i]) {
          registro[nom_cam.toLowerCase()] = response.data[i][nom_cam]
        }
        data.push(registro) //  asigna todos los datos de cada opcion del menu

        const pre = data[i].tpr_prg === 'S' ? '' : '-'
        let des_prg = data[i].des_prg.replace(String.raw`\<`, '')
        des_prg = des_prg == null ? '' : des_prg
        data[i].des_prg = pre + des_prg

        // response.data[i].des_prg = pre + response.data[i].des_prg.replace(String.raw`\<`, '')
      }
      //const menu = JSON.stringify(response.data)
      menu.value = (data)
     // console.log('Pinia ======leeMenu=====', menu.value, logoEmp.value)


    } catch (error) {
      console.log('Read Menu ',' Error', error)
      MessageBox(error.toJSON(), 16, 'Back-End error ')
      const router = useRouter()
      router.push('/Login')
      return
      // si no es un error de desconexion
    }
  }
  //////////////////////////////////

  function logout() {

    $reset()  //  resetea lo valores a originales
    // desde la aplicacion haria lo mismo session.$reset()
    router.push("/")
  }

  function updateMenu(menuObt: any[]) {
    menu.value = menuObt
  }

  watch(() => nom_emp.value,
    (new_emp, old_val) => {
      if (new_emp != old_val){
      //  id_con.value = ''
      //  menu.value = []
      }
      console.log('Watch Pinia nom_emp.value', new_emp, id_con.value)  // doest not do anything
//      if (new_emp.length > 2 && id_con.value.length > 9)
//        leeMenu()
    },
    { deep: true }
  )

  watch(() => id_con.value,
    (new_id, old_val) => {
      if (new_id != old_val) {
        console.log('Watch Pinia id_con.value', new_id)  // doest not do anything
        if (new_id.length > 9 && nom_emp.value.length > 2)
          leeMenu()
        else
          menu.value = []
      }
    },
    { deep: true }
  )

  watch(() => pass.value,
    (new_pass, old_val) => {
      if (new_pass == '')
        return

      const password = new_pass
      if (password.length > 3 && user.value.length > 0) {
        pass.value = ''
        open(password)
      }

    },
    { deep: true }
  )

  const doneMenu = computed(() => menu.value.filter(menu => menu.value.done))

  return {
    id_con,
    nom_emp,
    user,
    pass,
    menu,
    url,
    dialect,
    fpo_pge,
    logoEmp,
    doneMenu,
    fileLogoEmp
  }


},
  {
//    persist: { storage: persistedState.localStorage, },
    persist: { storage: persistedState.sessionStorage, },

},

)


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(Session, import.meta.hot))
}



/* puede utilizar watch'ers 
 pude ser reactiva
 desde la aplicacion cse puede actualizar todos los valores desde el obejo
   session.$patch({ id_con.value: '',
      user.value: '',
      nom_emp.value: '',
      url: '',
      menu: []})

   
 */