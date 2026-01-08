// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Para encontrar errorres de hidratacion
  debug: false,
  devtools: { enabled: false },

  devServer: {
    host: '0',
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

  plugins: [
  ],

  typescript: {
    shim: false,
    strict: true,
    includeWorkspace: true,
    //typecheck: true
  },

  css: ['~/assets/css/styles.css'],

  // Para poder hacer los enlaces simbolicos, se aumenta los directorios
  // para que vite los acepte
  vite: {
    /////// incluir estas dos lineas para correr nuxt 3.17 y 4.0 en dev /////////////////////////
    /////// quitarlas al compilar para producción //////////////////////////////////////////////
    //  optimizeDeps: { exclude: ['axios', 'form-data'] },
    //  ssr: { noExternal: true },
    //////////////////////////////////////////////////////////////////////////////////// 
    resolve: {
      preserveSymlinks: true,

    },
    server: {
      fs: { // Permite el acceso a los archivos del servidor
        allow: ['/siavcom/desarrollo/desarrolloweb/Vue/web-ones/'],
      },
    },
    esbuild: {
      keepNames: true   // Keeps the original class and method names (doesn't obfuscate them). Don't remove it. (problem nuxt >=3.15)
    }
  },

  modules: [
    "@nuxt/image",
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    //'nuxt-socket-io',
    `@vueuse/nuxt`,
    'nuxt-nodemailer'
  ],
  /*io: {
    // module options
    sockets: [{
      name: 'main',
      url: 'http://localhost:3000'
    }]

  },*/


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
  // Servidor Nitro 
  nitro: {
    experimental: {
      websocket: true // Enable experimental WebSocket support in Nitro
    },
  },

  // Variables de entorno 
  runtimeConfig: {
    // The private keys which are only available server-side
    basculaServer: 'my-secret-key',
    webOnesServer: '/sistemas/web-ones/public', // directorio de configuracion de empresas
    sqlNitro: false, // utiliza Nitro server desde nuxt 
    // Keys within public are also exposed client-side
    public: {
      //  bascula: ['scale.freeddns.org:3010'],
      // whatsAppServer: ['127.0.0.1:3000']
    },
  },

  compatibilityDate: '2024-10-02',
})
