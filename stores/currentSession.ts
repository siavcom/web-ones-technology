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

import { defineStore, acceptHMRUpdate } from 'pinia'
//import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
//import store from '../stores/index'
/*

// make sure to pass the right store definition, `Session` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(Session, import.meta.hot))
}



*/

export const Session = defineStore({
  id: 'currentSesion',
  state: () => ({
    id_con: '',
    user: '',
    nom_emp: '',
    url: '',
    menu: []
  }),
  persist: true,
  //{
  //  storage: persistedState.sessionStorage,
  //},
  /* {
    return {
      id_con: '',
      user: '',
      nom_emp: '',
      url: '',
      menu: []
    }
  } */

  actions: {
 
    update (id_con: string, user : string, nom_emp :string, url :string) {
      this.id_con = id_con
      this.user = user
      this.nom_emp = nom_emp
      this.url = url
      
    },
    updateMenu (menu : any[]) {
      this.menu = menu
    },
    updateId (id_con : string) { this.id_con=id_con },
    updateUser (user : string) { this.user=user },
    updateNomEmp (nom_emp : string ) { this.nom_emp=nom_emp },
    updateUrl (url: string) { this.url=url }
  },
  getters: {
    getData (variable: string) {
      if (variable === 'menu') { return this.menu }
      if (variable === 'user') { return this.user }
      if (variable === 'nom_emp') { return this.nom_emp }
    }
  }
}
)


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(Session, import.meta.hot))
}