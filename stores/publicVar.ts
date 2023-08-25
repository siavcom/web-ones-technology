import axios from 'axios'
export const PublicVar = defineStore('publicVar', () => {

  const Var = ref({
  })
  const session = Session()
  /// /////////////  open  ///////////////////
  // Hace la conexion al servidor NODEJS que
  // comunica con el servidor de SQL y se trae los valores de comepge
  /// ////////////////////////////////////////
  async function leeComepge() {

    const dat_vis = {
      id_con: session.id_con,
      tip_llamada: 'SQLEXEC',
      query: ' select * from publicvar'
    }

    try {
      const result = await axios.post(session.url + 'sql', dat_vis)
      if (result.data)
        Var.value = result.data[0]

    } catch (error) {

      console.warn("Can't read view publicvar", error)

    }

  }

  watch(() => session.id_con,
    (new_id, old_val) => {
      if (new_id > '   ') {
        console.log('PublicVar Watch Pinia id_con', new_id)  // doest not do anything
        leeComepge()
      }
    },
    { deep: true }
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


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(PublicVar, import.meta.hot))
}

