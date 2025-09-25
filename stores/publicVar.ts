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

        Public.value.des_mon1[1] = Var.value.de1_pge
        Public.value.des_mon1[2] = Var.value.de2_pge
        Public.value.des_mon1[3] = Var.value.de3_pge
        Public.value.des_mon1[4] = Var.value.de4_pge
        Public.value.des_mon1[5] = Var.value.de5_pge

        Public.value.pro_mon1[1] = Var.value.pr1_pge
        Public.value.pro_mon1[2] = Var.value.pr2_pge
        Public.value.pro_mon1[3] = Var.value.pr3_pge
        Public.value.pro_mon1[4] = Var.value.pr4_pge
        Public.value.pro_mon1[5] = Var.value.pr5_pge

        Public.value.des_imp1[0] = Var.value.di0_pge
        Public.value.des_imp1[1] = Var.value.di1_pge
        Public.value.des_imp1[2] = Var.value.di2_pge
        Public.value.des_imp1[3] = Var.value.di3_pge
        Public.value.des_imp1[4] = Var.value.di4_pge
        Public.value.des_imp1[5] = Var.value.di5_pge

        //        dec_mon1: ["", "", "", "", ""],
        Public.value.val_mon1[1] = Var.value.va1_pge
        Public.value.val_mon1[2] = Var.value.va2_pge
        Public.value.val_mon1[3] = Var.value.va3_pge
        Public.value.val_mon1[4] = Var.value.va4_pge
        Public.value.val_mon1[5] = Var.value.va5_pge

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

