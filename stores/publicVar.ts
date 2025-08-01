import axios from 'axios'
import { storeToRefs } from 'pinia'
export const PublicVar = defineStore('mPublic', () => {

  const Var = ref({
  })
  const session = Session()
  const { id_con } = storeToRefs(session)
  /// /////////////  open  ///////////////////
  // Hace la conexion al servidor NODEJS que
  // comunica con el servidor de SQL y se trae los valores de comepge
  /// ////////////////////////////////////////
  async function leePublicM() {

    const dat_vis = {
      id_con: id_con.value,
      tip_llamada: 'SQLEXEC',
      query: ' select * from publicvar'
    }

    try {
      const result = await axios.post(session.url + 'sql', dat_vis)
      if (result.data) {
        Var.value = result.data[0]
        console.log('Store mPublic Var.value=', result.data[0], Var.value)

      }

    } catch (error) {

      console.warn("Can't read view publicvar", error)

    }

  }

  watch(() => id_con.value,
    (new_id, old_val) => {
      console.log('Entre PublicVar Watch Pinia id_con', new_id, old_val)
      if (new_id == '') {
        Var.value = 0
        return
      }
      if (new_id > '0' && new_id != old_val) {

        console.log('PublicVar Watch Pinia id_con', new_id)  // doest not do anything
        leePublicM()
      }
    },
    { deep: false }
  )

  return {
    Var
  }


},
  {
    //    persist: { storage: persistedState.localStorage, },
    persist: { storage: persistedState.sessionStorage, },

  },

)


//if (import.meta.hot) {
// import.meta.hot.accept(acceptHMRUpdate(PublicVar, import.meta.hot))
//}

