// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //devtools: { enabled: true },
 devServer: {
    port: 3000
  },
imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ['stores']
  },
  // Configuracion para debug 
/*
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  },
  */
  plugins: [
   ],

  typescript: { shim: false },
  css: ['@/assets/css/styles.css'],
  /*
  css: ['@/assets/css/styles.css','vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
  server: {
      fs: {
        allow: ['/siavcom/desarrollo/desarrolloweb/Vue/web-ones/'],
      },
    },

    define: {
      'process.env.DEBUG': false,
    },
  },
   */

  // Para poder hacer los enlaces simbolicos, se aumenta los directorios
  // para que vite los acepte
  vite: {
    server: {
      fs: {
        allow: ['/siavcom/desarrollo/desarrolloweb/Vue/web-ones/'],
      },
    },
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      'acceptHMRUpdate',
     // ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },


  /*
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage'  //storage: sets the storage used to persist by default ('localStorage', 'sessionStorage' or 'cookies').
  }
*/



})
