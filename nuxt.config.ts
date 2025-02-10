// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Para encontrar errorres de hidratacion
  debug: false,
  devtools: { enabled: false },

  devServer: {
    host: 'localhost',
    port: 3000
  },
  // Correr y desarrollar con bun 
  nitro: {
    preset: 'bun',
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
      fs: { // Pewrmite el acceso a los archivos del servidor
        allow: ['/siavcom/desarrollo/desarrolloweb/Vue/web-ones/'],
      },
    },
  },

  // 26/Nov/2024
  //modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', "@nuxt/image"],


  modules: ['@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    "@nuxt/image", '@vueuse/nuxt'],

  // 23/Oct/2024Se puso para quitar error  [vite-node] [ERR_LOAD_URL] pinia-plugin-persistedstate
  //build: {
  //  transpile: ['pinia-plugin-persistedstate'],
  // },

  /*
    router: {
      middleware: ['checkSession']
    }
  */


  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico' },]
    }
  },

  // ========= <Variables Publicas de entorno > ============
  runtimeConfig: {
    // The private keys which are only available server-side
    basculaServer: 'my-secret-key',
    // Keys within public are also exposed client-side
    public: {
      bascula: ['http://localhost:3010']
    },
  },

  compatibilityDate: '2024-10-02',
})
