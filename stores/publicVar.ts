import axios from 'axios'
export const PublicVar= defineStore('publicVar', () => {
 
  const Var = ref({
   })
   const session=Session()
  /// /////////////  open  ///////////////////
  // Hace la conexion al servidor NODEJS que
  // comunica con el servidor de SQL y se trae los valores de comepge
  /// ////////////////////////////////////////
  async function leeComepge() {
  
    const dat_vis = {
      id_con: session.id_con,
      tip_llamada: 'SQLEXEC',
      query:' select * from man_comepge'
    }

    try {
      const data = await axios.post(session.url + 'sql', dat_vis)
      for (const campo in data[0])
          Var[campo]=data[0][campo]
    } catch  (error) {

      console.warn("Can't read comepge", error)

      }

  }

  watch(() => session.id_con,
    (new_id, old_val) => {
      if( new_id>'   ' ){
         console.log('Watch Pinia id_con', new_id)  // doest not do anything
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

