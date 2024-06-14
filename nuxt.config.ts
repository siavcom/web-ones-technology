// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  debug: false,  // Para encontrar errorres de hidratacion
  devtools: { enabled: false },

  devServer: {
    port: 3000
  },
  ssr: true,
  // target: 'static',

  alias: {  // Quita el error a instalar Nuxt
    // pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ['stores', 'classes']
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

  typescript: {
    shim: false,
    strict: true,
    includeWorkspace: true,
    typecheck: true
  },
  css: ['~/assets/css/styles.css'],
  // css: ['~/assets/css/styles.css', 'vue-final-modal/style.css'],

  // Para poder hacer los enlaces simbolicos, se aumenta los directorios
  // para que vite los acepte
  vite: {
    resolve: {
      preserveSymlinks: true,

    },
    server: {
      fs: {
        allow: ['/siavcom/desarrollo/desarrolloweb/Vue/web-ones/'],
      },
    },
  },
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', "@nuxt/image"],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      'acceptHMRUpdate',
      // ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  /*
    router: {
      middleware: ['checkSession']
    }
  */
  /*
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage'  //storage: sets the storage used to persist by default ('localStorage', 'sessionStorage' or 'cookies').
  }
*/

  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico' },]
    }
  },

  // Variables de entorno 
  runtimeConfig: {
    // The private keys which are only available server-side
    basculaServer: 'my-secret-key',
    // Keys within public are also exposed client-side
    public: {
      bascula: ['19toto.freeddns.org:3010']
    },
  },

})