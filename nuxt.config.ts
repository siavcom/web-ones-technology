// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  //$develoment :{devtools: { enabled: false }, //Shift + Alt + D in app to open
  //},   //configuracion solo en desarrollo
  devtools: { enabled: false },
  devServer: {
    port: 3000,
  },
  ssr: true,

  alias: {
    // Quita el error a instalar Nuxt
    //pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },

  // Pagina prerrenderizadas
  nitro: {
    prerender: {
      routes: ["/Login"],
    },
  },

  imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ["stores"],
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
  plugins: [],

  typescript: { shim: false },
  css: ["~/assets/css/styles.css"],

  // Para poder hacer los enlaces simbolicos, se aumenta los directorios
  // para que vite los acepte
  vite: {
    server: {
      fs: {
        allow: ["/siavcom/desarrollo/desarrolloweb/Vue/web-ones/"],
      },
    },
  },

  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt", // Quitar para instalar Nuxt y reinstalar con npm i -D @pinia-plugin-persistedstate/nuxt --legacy-peer-deps
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      "acceptHMRUpdate",
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
});
